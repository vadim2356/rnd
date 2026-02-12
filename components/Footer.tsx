import Link from "next/link";
import { business } from "@/data/business";
import { CITY_SLUGS, cities } from "@/data/cities";
import { SERVICE_SLUGS, services } from "@/data/services";
import { SOLUTION_SLUGS, solutions } from "@/data/solutions";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <p className="font-semibold text-white mb-2">{business.brandName}</p>
            <p className="text-sm">
              Установка систем очистки воды в Ростове-на-Дону и {business.regionName}. Монтаж под ключ, гарантия, сервис.
            </p>
          </div>
          <div>
            <p className="font-semibold text-white mb-3">Услуги</p>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Все услуги
                </Link>
              </li>
              {SERVICE_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link href={`/services/${slug}`} className="hover:text-white transition">
                    {services[slug].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white mb-3">Решения</p>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="/solutions" className="hover:text-white transition">
                  Решения по объектам
                </Link>
              </li>
              {SOLUTION_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link href={`/solutions/${slug}`} className="hover:text-white transition">
                    {solutions[slug].titleShort}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white mb-2">Контакты и документы</p>
            <p className="text-sm">
              {business.addressText}<br />
              Тел.:{" "}
              <a href={`tel:${business.phoneRaw}`} className="text-sky-400 hover:underline">
                {business.phone}
              </a>
            </p>
            <ul className="text-sm space-y-1 mt-2">
              <li>
                <Link href="/goroda" className="hover:text-white transition">
                  Города
                </Link>
              </li>
              <li>
                <Link href="/prices" className="hover:text-white transition">
                  Цены
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="hover:text-white transition">
                  Карта сайта
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Политика конфиденциальности
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-700">
          <p className="font-semibold text-white mb-3">Города выезда</p>
          <ul className="flex flex-wrap gap-2">
            {CITY_SLUGS.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/${slug}`}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-sm hover:bg-sky-800 hover:text-white transition"
                >
                  {cities[slug].name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-700 text-sm text-slate-500">
          <p>{business.requisites}</p>
          <p className="mt-1">© {new Date().getFullYear()} {business.brandName}. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
