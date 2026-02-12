# Деплой проекта

Next.js 14 (App Router), SSG — все страницы собираются при `npm run build`. Подходит для Vercel, Netlify, VPS или любого хостинга с Node.js 18+.

---

## 1. Перед любым деплоем

### Переменные окружения

Создайте файл `.env.local` (или задайте переменные в панели хостинга) и укажите **итоговый URL сайта**:

| Переменная | Описание | Пример |
|------------|----------|--------|
| `NEXT_PUBLIC_SITE_URL` | Публичный URL сайта (canonical, Open Graph, sitemap, robots) | `https://water-rostov.ru` |
| `SITE_URL` | Для next-sitemap при сборке; можно не задавать — возьмётся из `NEXT_PUBLIC_SITE_URL` | `https://water-rostov.ru` |
| `BITRIX24_WEBHOOK_URL` | Вебхук Bitrix24 для заявок (crm.lead.add); если не задан — используется URL по умолчанию из кода | `https://b24-xxx.bitrix24.ru/rest/.../crm.lead.add.json` |
| `MAIL_PASSWORD` | Пароль приложения Яндекса для отправки заявок на почту DukatSnab26@yandex.ru (Yandex SMTP). Без него заявки уходят только в Bitrix24 | пароль приложения из id.yandex.ru |

Без них подставится дефолт `https://water-rostov.ru`; вебхук Bitrix24 — из кода; без MAIL_PASSWORD письма на почту не отправляются.

### Проверка сборки локально

```bash
npm ci
npm run build
npm run start
```

Откройте http://localhost:3000 и проверьте главную, пару страниц услуг/городов, `/sitemap.xml`, `/robots.txt`.

---

## 2. Vercel (рекомендуется)

1. Зайдите на [vercel.com](https://vercel.com), подключите репозиторий (GitHub/GitLab/Bitbucket).
2. **Build Command:** `npm run build` (по умолчанию).
3. **Output Directory:** оставьте по умолчанию (Vercel сам определит Next.js).
4. В настройках проекта → **Environment Variables** добавьте:
   - `NEXT_PUBLIC_SITE_URL` = `https://ваш-домен.ru`
   - при желании `SITE_URL` = то же значение (для next-sitemap).
5. Деплой: каждый push в основную ветку создаёт превью; в настройках привяжите свой домен для продакшена.

---

## 3. Netlify

1. **New site from Git** → выберите репозиторий.
2. **Build command:** `npm run build`
3. **Publish directory:** для Next.js используйте [Netlify Next.js runtime](https://docs.netlify.com/frameworks/next-js/) (авто-определение) или укажите по их инструкции для Next.
4. **Environment variables:** добавьте `NEXT_PUBLIC_SITE_URL` и при необходимости `SITE_URL`.
5. Домен настраивается в **Domain management**.

---

## 4. Свой сервер (VPS / Node.js-хостинг)

1. Установите Node.js 18+ (рекомендуется LTS).
2. Клонируйте репозиторий и соберите проект:

```bash
git clone https://github.com/vadim2356/rnd.git
cd rnd
npm ci
NEXT_PUBLIC_SITE_URL=https://ваш-домен.ru SITE_URL=https://ваш-домен.ru npm run build
npm run start
```

3. Приложение слушает порт 3000. Используйте процесс-менеджер (PM2, systemd) и обратный прокси (Nginx/Apache) с SSL.

Пример с PM2:

```bash
npm install -g pm2
NEXT_PUBLIC_SITE_URL=https://ваш-домен.ru SITE_URL=https://ваш-домен.ru pm2 start npm --name "land" -- start
pm2 save
pm2 startup
```

---

## 5. Чеклист перед выкладкой

- [ ] Заданы `NEXT_PUBLIC_SITE_URL` (и при необходимости `SITE_URL`) для продакшен-домена.
- [ ] После деплоя проверены: главная, страницы услуг/городов, `/sitemap.xml`, `/robots.txt`.
- [ ] Canonical и Open Graph ведут на итоговый домен (без лишнего префикса или порта).
- [ ] Форма заявки (API `/api/lead`) при отправке отправляет лид в Bitrix24 (вебхук). При необходимости задайте `BITRIX24_WEBHOOK_URL`.

---

## API заявок

Роут `app/api/lead/route.ts` принимает POST с полями `name`, `phone` и опционально `city`, `source`, `comment`, `contactVia`. Заявка отправляется в Bitrix24 (crm.lead.add) по вебхуку. URL вебхука задаётся в переменной окружения `BITRIX24_WEBHOOK_URL` или используется значение по умолчанию из кода.
