import { business } from "@/data/business";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://water-rostov.ru";
const SITE_NAME = "Установка систем очистки воды — Ростов-на-Дону";

export type FAQItem = { question: string; answer: string };

export const FAQ_DATA: FAQItem[] = [
  {
    question: "Сколько стоит установка системы очистки воды?",
    answer:
      "Стоимость зависит от источника воды, качества воды и количества точек водоразбора. Базовые решения — от 45 000 ₽ под ключ, комплексные системы для дома со скважиной — от 85 000 ₽. Точный расчёт после выезда инженера и при необходимости анализа воды.",
  },
  {
    question: "За сколько дней монтируете?",
    answer:
      "В большинстве случаев монтаж выполняем за один рабочий день. Сложные объекты с несколькими этажами или нестандартной разводкой могут потребовать два дня. Сроки оговариваем при расчёте сметы.",
  },
  {
    question: "Нужен ли анализ воды перед подбором?",
    answer:
      "Для скважины и колодца анализ желателен — по нему подбираем точную схему и избегаем переплат. Если анализа нет, можем взять пробу при выезде или подобрать универсальную схему с запасом. Для центрального водопровода часто достаточно типового решения.",
  },
  {
    question: "Даёте ли гарантию на монтаж?",
    answer:
      "Да. На монтажные работы даём гарантию. На оборудование действует гарантия производителя. Условия прописываем в договоре.",
  },
  {
    question: "Выезжаете ли в область?",
    answer:
      "Да. Работаем по Ростову-на-Дону и выезжаем в города области: Батайск, Аксай, Азов, Таганрог, Новочеркасск, Шахты, Новошахтинск, Каменск-Шахтинский, Волгодонск и прилегающие районы. Выезд в пределах зоны обслуживания без доплат.",
  },
  {
    question: "Что входит в монтаж под ключ?",
    answer:
      "Выезд инженера, подбор оборудования, доставка, монтаж и подключение, пусконаладка, обучение пользованию. Договор и гарантия. Замена картриджей и сервис — отдельно по желанию.",
  },
  {
    question: "Можно ли поставить только питьевой фильтр под мойку?",
    answer:
      "Да. Если нужна только чистая вода на кухне для питья и готовки, подбираем проточный или накопительный фильтр под мойку. Монтаж занимает около часа.",
  },
  {
    question: "Обслуживаете установленное оборудование?",
    answer:
      "Да. Предлагаем сервисное обслуживание: замена картриджей, регенерация засыпок, ремонт. Можно оформить договор на сервис или вызывать по мере необходимости.",
  },
];

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    description:
      "Установка и монтаж систем очистки воды под ключ в Ростове-на-Дону и Ростовской области. Подбор по анализу воды, гарантия, сервис.",
    url: SITE_URL,
    telephone: business.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Малиновского, 3Б",
      addressLocality: "Ростов-на-Дону",
      addressRegion: "Ростовская область",
      addressCountry: "RU",
    },
    areaServed: [
      "Ростов-на-Дону",
      "Батайск",
      "Аксай",
      "Азов",
      "Таганрог",
      "Новочеркасск",
      "Шахты",
      "Новошахтинск",
      "Каменск-Шахтинский",
      "Волгодонск",
    ],
    priceRange: "₽₽",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
  };
}

export function getServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Установка систем очистки воды под ключ",
    description:
      "Монтаж водоочистки под ключ в Ростове-на-Дону и области: подбор по анализу воды, установка за 1 день, гарантия и сервис.",
    provider: {
      "@type": "LocalBusiness",
      name: SITE_NAME,
    },
    areaServed: {
      "@type": "State",
      name: "Ростовская область",
    },
  };
}

export function getFAQPageJsonLd(faq: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/** Динамический Service JSON-LD для страниц услуги / город+услуга */
export function getServiceJsonLdDynamic(
  serviceName: string,
  description: string,
  areaServed: string | string[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description,
    provider: { "@type": "LocalBusiness", name: SITE_NAME },
    areaServed: Array.isArray(areaServed)
      ? areaServed.map((name) => ({ "@type": "Place", name }))
      : { "@type": "Place", name: areaServed },
  };
}

/** Метаданные для динамических страниц */
export function buildMeta(
  title: string,
  description: string,
  path: string
): { title: string; description: string; alternates: { canonical: string }; openGraph: { title: string; description: string; url: string } } {
  const canonical = path.startsWith("http") ? path : `${SITE_URL}${path}`;
  const t = title.length > 58 ? title.slice(0, 55) + "…" : title;
  const d = description.length > 160 ? description.slice(0, 157) + "…" : description;
  return {
    title: t,
    description: d,
    alternates: { canonical },
    openGraph: { title: t, description: d, url: canonical },
  };
}

export { SITE_URL, SITE_NAME };
