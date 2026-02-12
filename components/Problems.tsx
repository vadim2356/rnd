import Link from "next/link";

/** Слаги услуг соответствуют data/services (SERVICE_SLUGS). */
const items = [
  {
    id: "iron",
    title: "Железо и ржавчина",
    description:
      "Рыжая вода, подтёки на сантехнике, металлический привкус. Устанавливаем обезжелезиватели и комплексные системы — вода становится прозрачной и без осадка.",
    serviceSlug: "obezzhelezivanie-vody",
  },
  {
    id: "hardness",
    title: "Жёсткость и накипь",
    description:
      "Накипь в чайнике и на нагревателях, белые разводы. Системы умягчения защищают технику и продлевают срок службы бойлеров и стиральных машин.",
    serviceSlug: "umyagchenie-vody",
  },
  {
    id: "odor",
    title: "Запах сероводорода",
    description:
      "Запах тухлых яиц из скважины или колодца. Аэрация и фильтры удаляют сероводород и улучшают вкус воды для бытовых и питьевых нужд.",
    serviceSlug: "aeraciya-vody",
  },
  {
    id: "turbidity",
    title: "Мутность и песок",
    description:
      "Песок, взвесь, мутная вода. Механические фильтры и осадочные колонны задерживают частицы — вода становится прозрачной, техника не забивается.",
    serviceSlug: "ustanovka-sistem-ochistki-vody",
  },
  {
    id: "bacteria",
    title: "Бактерии",
    description:
      "Риски при воде из скважины или колодца. УФ-стерилизаторы и обеззараживание делают воду безопасной для бытового использования.",
    serviceSlug: "uf-obezzarazhivanie",
  },
  {
    id: "drinking",
    title: "Питьевая вода на кухне",
    description:
      "Отдельный кран с чистой водой для питья и готовки. Проточные или накопительные системы под мойку — без бутылей и доставки.",
    serviceSlug: "obratnyj-osmos",
  },
];

const icons: Record<string, string> = {
  iron: "M4 6h16M4 12h16M4 18h7",
  hardness: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  odor: "M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11",
  turbidity: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  bacteria: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  drinking: "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z",
};

type ProblemsProps = {
  /** На странице города — ссылки ведут на /{citySlug}/{serviceSlug}, например /bataysk/obezzhelezivanie-vody */
  citySlug?: string;
};

export function Problems({ citySlug }: ProblemsProps = {}) {
  const getHref = (serviceSlug: string) =>
    citySlug ? `/${citySlug}/${serviceSlug}` : `/services/${serviceSlug}`;

  return (
    <section id="problems" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">
          Какие проблемы решаем
        </h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
          Подбираем оборудование под ваш анализ воды и задачи — от скважины до крана на кухне.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <article
              key={item.id}
              className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-sky-200 hover:bg-sky-50/30 transition"
            >
              <span className="inline-flex w-12 h-12 rounded-lg bg-sky-100 text-sky-600 items-center justify-center mb-4" aria-hidden>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icons[item.id] || icons.drinking} />
                </svg>
              </span>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">{item.description}</p>
              <Link
                href={getHref(item.serviceSlug)}
                className="text-sky-600 font-medium text-sm hover:underline"
              >
                Подробнее →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
