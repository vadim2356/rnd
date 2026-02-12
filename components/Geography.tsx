import Link from "next/link";
import { CITY_SLUGS, cities } from "@/data/cities";

export function Geography() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">
          География выезда
        </h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10">
          Работаем в Ростове-на-Дону и по всей Ростовской области. Выезд инженера и монтаж в указанных городах и прилегающих районах.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto items-start">
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100 aspect-[4/3] min-h-[280px]">
            <iframe
              title="Карта Ростовской области — зона выезда"
              src="https://yandex.ru/map-widget/v1/?ll=41.5%2C47.5&z=8&pt=39.7233%2C47.2313,pm2rdm"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              className="w-full h-full min-h-[280px]"
              style={{ border: 0 }}
            />
          </div>
          <div>
            <p className="font-semibold text-slate-900 mb-3">Ростов-на-Дону</p>
            <p className="text-slate-600 text-sm mb-6">
              Все районы города. Выезд в пригород (посёлки, СНТ) уточняется при заявке.
            </p>
            <p className="font-semibold text-slate-900 mb-3">Города области</p>
            <p className="text-slate-500 text-xs mb-3">
              Все города из конфига — ссылки ведут на посадочные страницы.
            </p>
            <ul className="flex flex-wrap gap-2 mb-6">
              {CITY_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/${slug}`}
                    className="inline-block px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 text-sm hover:border-sky-400 hover:text-sky-600 transition"
                  >
                    {cities[slug].name}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href="#contacts"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition shadow-lg shadow-sky-600/20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Выезд инженера
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
