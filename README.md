# Технический и SEO-аудит проекта

**Проект:** SEO-сетка «Установка систем очистки воды в Ростове-на-Дону и Ростовской области»  
**Дата аудита:** по коду репозитория  
**Аудитор:** Senior Full-Stack + SEO-архитектор (аудит по реальному коду)

---

## 1. Общая информация

### Стек
- **Framework:** Next.js 14.2.35 (App Router)
- **Язык:** TypeScript
- **Стили:** Tailwind CSS
- **Доп. зависимости:** next-sitemap (postbuild), React 18

### Количество страниц (реально)
| Тип | Количество |
|-----|------------|
| Главная | 1 |
| Услуги (индекс) | 1 |
| Услуга (без города) | 7 |
| Решения (индекс) | 1 |
| Решение | 4 |
| Города (индекс /goroda) | 1 |
| Город-хаб | 10 |
| Город + услуга | 70 (10 × 7) |
| Карта сайта /sitemap | 1 |
| Политика /privacy | 1 |
| Благодарность /thanks | 1 (noindex) |
| **Итого индексируемых** | **97** |

### Динамические маршруты
- `app/services/[serviceSlug]/page.tsx` — 7 параметров
- `app/solutions/[solutionSlug]/page.tsx` — 4 параметра
- `app/[citySlug]/page.tsx` — 10 параметров
- `app/[citySlug]/[serviceSlug]/page.tsx` — 70 комбинаций

### generateStaticParams
- **Используется во всех 4 динамических маршрутах:**
  - `services/[serviceSlug]`: `SERVICE_SLUGS.map(s => ({ serviceSlug: s }))`
  - `solutions/[solutionSlug]`: `SOLUTION_SLUGS.map(s => ({ solutionSlug: s }))`
  - `[citySlug]`: `CITY_SLUGS.map(c => ({ citySlug: c }))`
  - `[citySlug]/[serviceSlug]`: вложенный цикл по `CITY_SLUGS` и `SERVICE_SLUGS`
- Все страницы предсобираются при `next build` (SSG).

### Защита notFound()
- **Есть во всех динамических маршрутах:**
  - `services/[serviceSlug]`: `if (!service) notFound()`
  - `solutions/[solutionSlug]`: `if (!solution) notFound()`
  - `[citySlug]`: `if (!isCitySlug(citySlug)) notFound()`
  - `[citySlug]/[serviceSlug]`: проверка и города, и услуги перед рендером
- При невалидном slug отдаётся 404.

---

## 2. URL-структура

### Service pages (услуги без города)
- `/services`
- `/services/ustanovka-sistem-ochistki-vody`
- `/services/umyagchenie-vody`
- `/services/obezzhelezivanie-vody`
- `/services/aeraciya-vody`
- `/services/obratnyj-osmos`
- `/services/uf-obezzarazhivanie`
- `/services/obsluzhivanie`  

**Итого: 1 индекс + 7 = 8 URL.**

### Solution pages
- `/solutions`
- `/solutions/dlya-chastnogo-doma`
- `/solutions/dlya-kvartiry`
- `/solutions/iz-skvazhiny`
- `/solutions/dlya-biznesa-horeca`  

**Итого: 1 индекс + 4 = 5 URL.**

### City pages (город-хабы)
- `/rostov-na-donu`, `/bataysk`, `/aksay`, `/azov`, `/taganrog`, `/novocherkassk`, `/shahty`, `/novoshakhtinsk`, `/kamensk-shakhtinskiy`, `/volgodonsk`  

**Итого: 10 URL.**

### City + service pages
- Для каждого из 10 городов по 7 услуг: `/{citySlug}/{serviceSlug}`.  
- Примеры: `/rostov-na-donu/umyagchenie-vody`, `/bataysk/obezzhelezivanie-vody`, …  

**Итого: 70 URL.**

### Прочие
- `/`, `/goroda`, `/sitemap`, `/privacy`, `/thanks` (noindex).

### Сводка по количеству
- **Всего уникальных URL:** 8 + 5 + 10 + 70 + 5 = **98** (с главной и служебными).
- **Индексируемых:** 97 (/thanks с `robots: { index: false }`).

### Дубли URL
- **Нет.** Один и тот же контент не отдаётся по разным URL. Город+услуга и услуга без города — разные страницы с разным контентом и разным canonical.

### Конфликт маршрутов
- **Нет.** Статические сегменты (`/services`, `/solutions`, `/goroda`, `/sitemap`, `/privacy`, `/thanks`) заданы явными папками в `app/`. Динамический `[citySlug]` не перехватывает их, т.к. в App Router приоритет у более специфичного статического маршрута.
- В `data/cities.ts` объявлен `RESERVED_SLUGS` (privacy, thanks, services, solutions, sitemap, api, goroda), но middleware не использует его — конфликт исключён за счёт структуры папок.

---

## 3. Контент-генерация

### hashSeed и детерминированность
- В `lib/content-generator.ts` реализованы:
  - **hashSeed(str)** — целочисленный хеш от строки (цикл по символам, битовые операции).
  - **pickBySlug(slug, variants)** — выбор варианта как `variants[hashSeed(slug) % variants.length]`.
- Для страницы «город + услуга» seed = `${citySlug}-${serviceSlug}`; для «услуга» — `serviceSlug`; для город-хаба — `citySlug`. Один и тот же slug всегда даёт один и тот же вариант.

### Вариативность по секциям
- Hero: 3 варианта.
- Лид: 3 варианта.
- «Когда нужна услуга»: 4 варианта.
- «Как проходит монтаж»: 3 варианта.
- Ценовые пакеты: 3 набора (Эконом/Оптимум/Премиум).
- FAQ: вопросы и ответы выбираются по индексу от hashSeed(slug + "q" / "a" + i), количество — из `service.faqCount` (6–8).
- Отзывы: 3–4 шт., индексы без повтора через Set.
- Кейсы (город-хаб): 3–4 шт., детерминированная перестановка по citySlug.

### Повторяемость абзацев
- Одинаковые шаблоны подставляют разные `cityName`, `cityNameGenitive`, `serviceTitle` и т.д. Тексты между городами и услугами различаются.
- Риск: один и тот же вариант «Когда нужна» (один из четырёх) может выпасть разным city+service из-за одинакового остатка от деления. Полных копий абзацев между страницами нет за счёт подстановки переменных; формулировки шаблонов повторяются на разных страницах.

### Реальный объём текста (оценка по коду)
- **Город + услуга:** hero ~35 слов, лид ~45, «когда нужна» ~75, «как проходит» ~70, «что входит» ~25, пакеты ~75, FAQ 6–8 × ~45 ≈ 300, отзывы 3–4 × ~25 ≈ 90 → **~715 слов** (порядка 650–800 в зависимости от faqCount и вариантов).
- **Услуга без города:** та же структура → **~700 слов**.
- **Город-хаб:** лид ~40, список услуг (коротко), блок проблем, кейсы 3–4 × ~35 ≈ 130, FAQ 5–6 × ~45 ≈ 250 → **~500–600 слов**.

### Страницы с объёмом &lt; 600 слов
- **Город-хабы** попадают в зону 500–600 слов — есть риск thin content по сравнению с типичными коммерческими лендингами (часто 800+ слов).
- Индексные страницы (`/services`, `/solutions`, `/goroda`) — короткие (по сути списки ссылок + один абзац).

### Оценки
- **Риск дублей контента:** низкий. Уникальность обеспечивается seed по slug и подстановкой города/услуги; полных копий страниц нет.
- **Риск thin content:** средний. Город-хабы и индексные страницы относительно короткие; страницы «услуга» и «город+услуга» в норме (порядка 700 слов).

---

## 4. SEO

### Пример метаданных для 3 страниц

**1) Услуга: `/services/umyagchenie-vody`**
- **title (из buildMeta):** «Умягчение воды в Ростове-на-Дону — под ключ» (48 символов).
- **description:** «Снижение жёсткости, защита техники от накипи. Ростов-на-Дону и Ростовская область. Монтаж водоочистки под ключ. Дукат Снаб.» (обрезается до 157 в buildMeta).
- **canonical:** `{SITE_URL}/services/umyagchenie-vody`
- **openGraph:** title и description те же, url = canonical.

**2) Город + услуга: `/bataysk/obezzhelezivanie-vody`**
- **title:** «Обезжелезивание воды в Батайск — под ключ» (примечание: в коде подставляется `city.name`; для Батайска грамматически уместнее «в Батайске», но это не ломает SEO).
- **description:** shortDescription + «Батайск и Ростовская область. Монтаж водоочистки под ключ. Дукат Снаб.»
- **canonical:** `{SITE_URL}/bataysk/obezzhelezivanie-vody`
- **openGraph:** аналогично.

**3) Решение: `/solutions/iz-skvazhiny`**
- **title:** «Очистка воды из скважины в Ростове-на-Дону — под ключ»
- **description:** `solution.description.slice(0, 140) + " " + brandName`
- **canonical:** `{SITE_URL}/solutions/iz-skvazhiny`
- **openGraph:** те же title, description, url.

### Уникальность title
- Уникальны за счёт названия услуги/решения и города. Формула единообразная: «{Услуга/Решение} в {Город} — под ключ» или «… в Ростове-на-Дону …».

### Переспам
- В мета и на странице используются одни и те же ключи: «установка систем очистки воды», «монтаж водоочистки», «под ключ», «Ростов-на-Дону», «Ростовская область», «очистка воды из скважины». Частота в пределах нормы, явного переспама нет.

### Длина title/description
- **buildMeta:** title обрезается до 57 символов + «…», description до 157 + «…» — укладывается в рекомендации.
- **Важно:** в `app/layout.tsx` задан `template: "%s | ${SITE_NAME}"`. Итоговый тег в HTML получается вида «Умягчение воды в Ростове-на-Дону — под ключ | Установка систем очистки воды — Ростов-на-Дону» (~100 символов). Для выдачи обычно рекомендуют 50–60 символов — **фактическая длина title в браузере превышает рекомендацию** из-за шаблона.

### JSON-LD

**Service**
- На главной: `getServiceJsonLd()` в `lib/seo.ts` — тип Service, name, description, provider (LocalBusiness), areaServed (State).
- На страницах услуги и город+услуга: `getServiceJsonLdDynamic(serviceName, description, areaServed)` — @context, @type Service, name, description, provider, areaServed (Place или массив Place). Структура корректна.

**FAQPage**
- На главной: `getFAQPageJsonLd(FAQ_DATA)` — массив Question с acceptedAnswer (Answer, text).
- На страницах услуги и город+услуга: тот же формат, данные из `getFaq(seedKey, faqCount, vars)`. Структура соответствует schema.org.

**BreadcrumbList**
- `getBreadcrumbJsonLd(items)` — itemListElement с ListItem (position, name, item). URL собирается как `SITE_URL + item.url` для относительных путей. Ошибок структуры нет.

**Замечания**
- На страницах решений (`solutions/[solutionSlug]`) выводится только Service и BreadcrumbList; FAQPage нет — для решений это не обязательно.
- Волгодонск в `getLocalBusinessJsonLd` в areaServed отсутствует (в коде перечислены 9 городов); в `cities` Волгодонск есть — стоит добавить для консистентности.

---

## 5. Перелинковка

### Хлебные крошки
- Компонент `components/Breadcrumbs.tsx`: принимает `items: { name, url }[]`, рендерит навигацию с разделителем «/», последний элемент без ссылки. Используется на всех SEO-страницах (услуги, решения, город, город+услуга) с корректными цепочками (Главная → … → текущая страница). Ссылки относительные (`/`, `/services`, `/${citySlug}` и т.д.) — работают.

### Блок «Смотрите также»
- Компонент `components/SeeAlso.tsx`: заголовок + список ссылок (label, href). Используется:
  - на странице услуги: ссылки на ту же услугу в 10 городах;
  - на странице город+услуга: ссылки на 5 других услуг в том же городе;
  - на город-хабе: ссылки на 6 услуг в этом городе;
  - на странице решения: ссылки на 8 городов.
- Ссылки формируются из `CITY_SLUGS`, `getServicesForCityPage()`, без внешних URL — битых ссылок нет при текущей конфигурации данных.

### Корректность ссылок
- Все href строятся из слагов из `data/cities.ts` и `data/services.ts`; статические пути (`/services`, `/solutions`, `/goroda`, `/sitemap`, `/privacy`) зашиты в коде. Битых внутренних ссылок не выявлено.

---

## 6. Sitemap

### Источники
- **app/sitemap.ts** — функция `sitemap()` возвращает массив URL для Next.js (отдаётся по `/sitemap.xml`).
- **next-sitemap** — в `postbuild` генерирует свои файлы (переменная `SITE_URL` в конфиге, в проекте чаще используется `NEXT_PUBLIC_SITE_URL` — возможное расхождение базового URL).

### Количество URL в app/sitemap.ts
- Главная, /services, /solutions, /goroda, /sitemap, /privacy: **6**
- /services/{slug}: **7**
- /solutions/{slug}: **4**
- /{citySlug}: **10**
- /{citySlug}/{serviceSlug}: **70**  
**Итого: 97 URL.**

### Покрытие
- Все перечисленные выше индексируемые маршруты присутствуют. Страница `/thanks` в sitemap не включена (и не должна — noindex).
- В sitemap **нет** явного указания `/thanks` — корректно.

### Пропуски
- Пропущенных индексируемых страниц нет. Дублирования с next-sitemap можно избежать, отключив один из способов генерации или унифицировав базовый URL и исключения.

---

## 7. Производительность

### Client Components
- С директивой `"use client"`: `ContactForm`, `FAQ`, `FloatingCTA`, `Header`, `Quiz`. Остальные (Breadcrumbs, SeeAlso, Hero, Problems, Mounting, Objects, HowWeWork, WhyUs, Geography, Reviews, Footer) — серверные. Форма, квиз и плавающая кнопка обоснованно клиентские; лишней клиентизации нет.

### Тяжёлые зависимости
- В production-зависимостях только next, react, react-dom, next-sitemap. Тяжёлых UI-библиотек и больших клиентских бандлов не видно. Изображения — локальные SVG (placeholder, avatar).

### Lighthouse
- Возможные моменты: главная страница содержит много секций (Hero, Problems, Mounting, Objects, HowWeWork, Quiz, WhyUs, Geography, Reviews, FAQ, контакты) — при большом количестве контента можно вынести часть в ленивую загрузку. Отдельные SEO-страницы лёгкие (в основном текст и ссылки). Критичных препятствий для хороших оценок не выявлено.

---

## 8. Риски SEO

- **Длина title в HTML:** из-за шаблона layout итоговый title превышает 50–60 символов — хуже отображение в выдаче и возможное обрезание.
- **Thin content:** город-хабы и индексные страницы (услуги/решения/города) относительно короткие; при жёсткой политике поисковиков по «малотекстовым» страницам часть URL может получать меньший вес.
- **Нет отдельных h1 для части блоков:** на ряде страниц один h1 и несколько h2; структура в целом нормальная, но можно усилить иерархию под ключевые запросы.
- **Мало внешних сигналов:** нет упора на ссылочную массу, отзывы, кейсы с внешних площадок — для ТОПа по конкурентным запросам может не хватать.
- **Один регион:** все страницы завязаны на Ростов и область; гео-варианты (например, под соседние области) не развиты.
- **Нет блога/статей:** нет дополнительного длинноформатного контента под информационные запросы и долгохвост.
- **Скорость индексации:** кроме sitemap и robots, нет явной отправки в поисковики (например, IndexNow); пауза до появления в выдаче может быть больше.

---

## 9. Оценка

| Критерий | Оценка | Комментарий |
|----------|--------|-------------|
| **Архитектура** | **8/10** | Чёткое разделение data / lib / app / components, SSG, единый генератор контента и SEO-хелперы. Минус: дублирование логики sitemap (Next.js + next-sitemap), различие SITE_URL. |
| **SEO-реализация** | **7/10** | Мета, canonical, OG, JSON-LD (Service, FAQ, BreadcrumbList), перелинковка и хлебные крошки на месте. Минусы: длинный итоговый title из-за template, нет FAQ JSON-LD на решениях (по желанию). |
| **Масштабируемость** | **8/10** | Добавление города/услуги через конфиги и generateStaticParams; контент через шаблоны и seed. При большом росте числа городов/услуг стоит вынести генерацию контента в отдельный слой (например, файлы или CMS). |
| **Риск санкций** | **Низкий** | Нет клоаки, скрытого текста, массового дублирования. Контент вариативный и привязан к реальным сущностям (города, услуги). Риск в основном связан с тонким контентом на части страниц, а не с наказаниями. |

---

## 10. Рекомендации

### 5 критичных улучшений
1. **Сократить итоговый title:** убрать или изменить `template` в layout для SEO-страниц (например, не добавлять `| ${SITE_NAME}` к длинным заголовкам) или задавать полный title на странице без шаблона, чтобы уложиться в 50–60 символов.
2. **Унифицировать sitemap и базовый URL:** оставить один способ генерации sitemap (предпочтительно `app/sitemap.ts`) и одну переменную окружения (например, `NEXT_PUBLIC_SITE_URL`) для canonical, sitemap и next-sitemap (если оставлять).
3. **Добавить Волгодонск в LocalBusiness areaServed** в `lib/seo.ts` (getLocalBusinessJsonLd), чтобы перечень городов совпадал с data/cities.
4. **Увеличить объём текста на город-хабах до 700+ слов:** дополнительный блок (например, «Как мы работаем в {город}» или краткие советы по выбору системы) или расширение кейсов/FAQ.
5. **Проверять грамматику в title для городов:** при необходимости подставлять «в {город}» с правильным падежом (например, «в Батайске», «в Аксае») через поле в data (например, namePrepositional) и использовать его в generateMetadata.

### 5 желательных улучшений
1. Вынести генерацию sitemap в один источник и отключить дублирование (либо отключить next-sitemap, либо убрать app/sitemap.ts и настроить next-sitemap под все URL).
2. Добавить на главную и ключевые страницы JSON-LD Organization (или расширить LocalBusiness) с logo, контактами, соцсетями при наличии.
3. Добавить явные openGraph images (og:image) для шаринга в соцсетях (хотя бы дефолтное изображение по умолчанию в layout).
4. Реализовать IndexNow или пинг при публикации/обновлении страниц для ускорения появления в поиске.
5. Для решений добавить блок FAQ и FAQPage JSON-LD, чтобы усилить релевантность и шанс на rich snippets.

### 5 SEO-усилений для выхода в ТОП
1. **Внешние ссылки и упоминания:** размещение на картах, каталогах, отзовиках по региону; ссылки с тематических и локальных сайтов.
2. **Реальные отзывы и кейсы:** подмена шаблонных отзывов в генераторе на реальные (с согласием) и размещение на странице + маркировка Review/aggregateRating в разметке.
3. **Расширение контента по запросам:** добавить блоки «Частые вопросы по {услуга} в {город}», «Сравнение вариантов», «Что входит в стоимость» с уникальным текстом (можно частично генерировать по шаблонам с большим числом вариантов).
4. **Внутренняя перелинковка по ключам:** в текстах страниц добавить осмысленные ссылки на другие услуги/города с анкорами вида «умягчение воды в Батайске», «обезжелезивание в Ростове» и т.д.
5. **Скорость и Core Web Vitals:** проверить LCP/CLS на реальном хостинге; при необходимости отложенная загрузка ниже-the-fold секций на главной, оптимизация шрифтов и критического CSS.

---

## 11. Как менять фото на сайте

Все изображения на сайте задаются путями в коде. Чтобы заменить любое фото: положите файл в **`public/images/`** (или подпапку) и укажите путь в соответствующем файле. В коде пути указаны на **webp** (рекомендуется для скорости). Форматы: **jpg, png, webp, svg**.

**Конвертация в webp:** если у вас пока лежат PNG/JPG, конвертируйте их в webp (например [Squoosh](https://squoosh.app), ImageMagick `convert *.png -quality 85 *.webp` или онлайн-конвертер) и положите в те же папки с расширением `.webp`. Ожидаемые файлы: `public/images/1.webp` … `7.webp`, `public/images/prices/soft-1252.webp`, `complex-1252.webp`, `ro-300.webp`, `pod-moiky2.webp`.

---

### Главная страница и общие блоки

Файл: **`lib/image-paths.ts`**, объект **`IMAGE_PATHS`**.

| Где на сайте | Ключ | Куда положить файл | Пример пути в коде |
|--------------|------|--------------------|---------------------|
| Герой (главная, страница «Услуги») | `hero` | `public/images/` | `"/images/1.webp"` |
| Блок «Проблемы с водой» | `problems` | `public/images/` | `"/images/placeholder.svg"` |
| Блок «Монтаж под ключ» | `mounting` | `public/images/` | `"/images/2.webp"` |
| Карточки «Решения по объектам»: дом | `objects.house` | `public/images/` | `"/images/3.webp"` |
| Карточки «Решения по объектам»: квартира | `objects.apartment` | `public/images/` | `"/images/4.webp"` |
| Карточки «Решения по объектам»: скважина | `objects.well` | `public/images/` | `"/images/5.webp"` |
| Карточки «Решения по объектам»: бизнес | `objects.business` | `public/images/` | `"/images/6.webp"` |
| Блок «Рассчитать стоимость» (квиз) | `quiz` | `public/images/` | `"/images/7.webp"` |
| Блок «Контакты и заявка» на главной | `contacts` | `public/images/` | `"/images/contact.webp"` |
| Герой на страницах городов (например /rostov-na-donu) | `cityHero` | `public/images/` | `"/images/city-hero.jpg"` |

**Как поменять:** откройте `lib/image-paths.ts`, найдите нужный ключ и замените значение на путь к вашему файлу, например `"/images/contact.webp"`. Файл должен лежать в `public/images/` — в коде путь всегда от корня сайта: `/images/имя-файла.расширение`.

---

### Фото для каждой страницы услуги

На страницах услуг (например `/services/umyagchenie-vody`, `/rostov-na-donu/obratnyj-osmos`) в герое можно показать своё фото для каждого типа услуги.

Файл: **`lib/image-paths.ts`**, объект **`SERVICE_HERO_IMAGES`**. Ключ — slug услуги из `data/services.ts`.

| Slug услуги | Пример пути |
|-------------|-------------|
| `umyagchenie-vody` | `"/images/services/umyagchenie.jpg"` |
| `obezzhelezivanie-vody` | `"/images/services/obezzhelezivanie.jpg"` |
| `aeraciya-vody` | `"/images/services/aeraciya.jpg"` |
| `obratnyj-osmos` | `"/images/services/osmos.jpg"` |
| `uf-obezzarazhivanie` | `"/images/services/uf.jpg"` |
| `obsluzhivanie` | `"/images/services/obsluzhivanie.jpg"` |
| `ustanovka-sistem-ochistki-vody` | `"/images/services/ustanovka.jpg"` |

Если для услуги ключ не задан — подставится `IMAGE_PATHS.hero`. Файлы кладите в `public/images/services/` (или укажите свой путь).

---

### Карточки цен (главная, страницы /prices и /[город]/prices)

Три системы: умягчение, комплексная очистка, обратный осмос. Пути задаются в **`lib/content-generator.ts`** в массиве **`PRICES_SYSTEM_TYPES`** (поле `image` у каждого объекта).

| Система | Имя файла в `public/images/prices/` |
|---------|-------------------------------------|
| Система умягчения воды | `soft-1252.jpg` |
| Комплексная система очистки воды | `complex-1252.jpg` |
| Система обратного осмоса на весь дом | `ro-300.jpg` |

Чтобы использовать свои имена файлов — измените поле `image` в `PRICES_SYSTEM_TYPES` (например `"/images/prices/мое-фото.jpg"`) и положите файл в `public/images/prices/`.

---

### Фото с монтажей (галерея на главной и на страницах услуг)

Файл: **`lib/installation-photos.ts`**, массив **`INSTALLATION_PHOTOS`**.

1. Положите фото в **`public/images/installations/`** (например `1.jpg`, `2.jpg`).
2. В `lib/installation-photos.ts` добавьте в массив пути: `"/images/installations/1.jpg"`, `"/images/installations/2.jpg"` и т.д.

Порядок в массиве задаёт порядок показа в галерее.

---

### Примеры работ на страницах городов

Блок «Примеры работ» на страницах городов (например `/rostov-na-donu`) подтягивает фото по имени файла.

1. Положите изображения в **`public/images/cases/`**.
2. Имена: **`{slug-города}-1.jpg`**, **`{slug-города}-2.jpg`** и т.д.  
   Примеры: `rostov-na-donu-1.jpg`, `bataysk-1.jpg`, `aksay-2.jpg`.
3. Если файла нет — подставится плейсхолдер. Сколько карточек показывать и в каком порядке — задаётся генератором контента (3–4 кейса на город).

---

**Кратко:** чтобы поменять любое фото — положите файл в `public/images/` (или подпапку) и укажите путь в нужном месте: `lib/image-paths.ts`, `lib/content-generator.ts` или `lib/installation-photos.ts`. В проекте пути указаны на формат **webp** (меньше вес, быстрее загрузка); при замене картинок конвертируйте их в webp и положите с расширением `.webp`, либо измените пути в коде на свои расширения.

---

## 12. Деплой на хостинг

Проект — статический Next.js (SSG): все страницы собираются при `next build`, postbuild генерирует sitemap через next-sitemap. Подойдёт любой хостинг с Node.js 18+ или платформы для статики/Next.js.

### Переменные окружения

Перед деплоем задайте **базовый URL сайта** (для canonical, Open Graph, sitemap, robots):

| Переменная | Описание | Пример |
|------------|----------|--------|
| `NEXT_PUBLIC_SITE_URL` | Публичный URL сайта (используется в коде и sitemap Next.js) | `https://water-rostov.ru` |
| `SITE_URL` | Используется в `next-sitemap.config.js` при postbuild; лучше задать тем же значением | `https://water-rostov.ru` |

Без переменных подставляется дефолт `https://water-rostov.ru` (см. `lib/seo.ts`, `app/robots.ts`, `next-sitemap.config.js`).

### Vercel (рекомендуется для Next.js)

1. Подключите репозиторий на [vercel.com](https://vercel.com) (GitHub/GitLab/Bitbucket).
2. Vercel сам определит Next.js; **Build Command:** `npm run build` (postbuild выполнится автоматически).
3. В настройках проекта → **Environment Variables** добавьте:
   - `NEXT_PUBLIC_SITE_URL` = `https://ваш-домен.ru`
   - при необходимости `SITE_URL` = то же значение (для next-sitemap).
4. Деплой: каждый push в основную ветку создаёт превью; для продакшена привяжите свой домен в настройках.

### Netlify

1. **New site from Git** → выберите репозиторий.
2. **Build command:** `npm run build`  
   **Publish directory:** `.next` — не подходит для Next.js standalone. Лучше использовать:
   - **Build command:** `npm run build`  
   **Publish directory:** оставьте пустым и укажите **Plugin** или настройте **Next.js runtime** (Netlify поддерживает Next.js через адаптер или отдельные инструкции для Next на их документации).
3. В **Site settings → Environment variables** добавьте `NEXT_PUBLIC_SITE_URL` и при необходимости `SITE_URL`.
4. Домен задаётся в **Domain management**.

Для Netlify актуальна [официальная инструкция по Next.js](https://docs.netlify.com/frameworks/next-js/); при использовании статического экспорта или их Next runtime пути могут отличаться.

### Свой сервер (VPS, VDS) или shared-хостинг с Node.js

1. На сервере: Node.js 18+ (рекомендуется LTS).
2. Клонируйте репозиторий, установите зависимости и соберите проект:
   ```bash
   npm ci
   npm run build
   ```
3. Запуск (продакшен):
   ```bash
   npm run start
   ```
   По умолчанию приложение слушает порт 3000. Используйте процесс-менедер (PM2, systemd) и обратный прокси (Nginx/Apache) с SSL.
4. Переменные окружения задайте в системе или в `.env.production`:
   ```bash
   NEXT_PUBLIC_SITE_URL=https://ваш-домен.ru
   SITE_URL=https://ваш-домен.ru
   ```

### Docker (опционально)

Пример минимального образа для запуска после сборки:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG NEXT_PUBLIC_SITE_URL=https://water-rostov.ru
ARG SITE_URL=https://water-rostov.ru
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV SITE_URL=$SITE_URL
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
RUN npm ci --omit=dev
EXPOSE 3000
CMD ["npm", "start"]
```

Сборка и запуск:

```bash
docker build -t land-next .
docker run -p 3000:3000 -e NEXT_PUBLIC_SITE_URL=https://ваш-домен.ru -e SITE_URL=https://ваш-домен.ru land-next
```

### Краткий чеклист перед выкладкой

- [ ] Заданы `NEXT_PUBLIC_SITE_URL` и при необходимости `SITE_URL` для продакшен-домена.
- [ ] После деплоя проверены главная, несколько страниц услуг/городов, `/sitemap.xml`, `/robots.txt`.
- [ ] Canonical и Open Graph ведут на итоговый домен (без лишнего префикса или порта).

---

*Конец отчёта. Все выводы сделаны на основе анализа кода в репозитории.*
