import Link from "next/link";
import { CITY_SLUGS, cities } from "@/data/cities";
import { SERVICE_SLUGS, services } from "@/data/services";
import { SOLUTION_SLUGS, solutions } from "@/data/solutions";
import { SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Карта сайта",
  description: "Все страницы сайта: услуги, решения, города.",
  robots: { index: true, follow: true },
};

export default function SitemapPage() {
  const breadcrumbs = [
    { name: "Главная", url: "/" },
    { name: "Карта сайта", url: "/sitemap" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-br from-sky-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight mb-6">
            Карта сайта
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed max-w-3xl">
            Все разделы и страницы сайта: услуги, решения по объектам, города выезда, цены.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-16">
        <section className="mt-10">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-semibold text-slate-900">Основные</h2>
            </div>
            <div className="p-6">
              <ul className="space-y-2 text-slate-700">
                <li><Link href="/" className="text-sky-600 hover:underline font-medium">Главная</Link></li>
                <li><Link href="/services" className="text-sky-600 hover:underline font-medium">Услуги</Link></li>
                <li><Link href="/solutions" className="text-sky-600 hover:underline font-medium">Решения по объектам</Link></li>
                <li><Link href="/goroda" className="text-sky-600 hover:underline font-medium">Города</Link></li>
                <li><Link href="/prices" className="text-sky-600 hover:underline font-medium">Цены</Link></li>
                <li><Link href="/privacy" className="text-sky-600 hover:underline font-medium">Политика конфиденциальности</Link></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-semibold text-slate-900">Услуги</h2>
            </div>
            <div className="p-6">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                {SERVICE_SLUGS.map((slug) => (
                  <li key={slug}>
                    <Link href={`/services/${slug}`} className="text-sky-600 hover:underline font-medium">
                      {services[slug].title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-semibold text-slate-900">Решения</h2>
            </div>
            <div className="p-6">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                {SOLUTION_SLUGS.map((slug) => (
                  <li key={slug}>
                    <Link href={`/solutions/${slug}`} className="text-sky-600 hover:underline font-medium">
                      {solutions[slug].title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-semibold text-slate-900">Города</h2>
            </div>
            <div className="p-6">
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-slate-700">
                {CITY_SLUGS.map((slug) => (
                  <li key={slug}>
                    <Link href={`/${slug}`} className="text-sky-600 hover:underline font-medium">
                      {cities[slug].name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-semibold text-slate-900">Цены</h2>
            </div>
            <div className="p-6">
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-slate-700">
                <li>
                  <Link href="/prices" className="text-sky-600 hover:underline font-medium">
                    Цены (Ростов-на-Дону и область)
                  </Link>
                </li>
                {CITY_SLUGS.map((slug) => (
                  <li key={slug}>
                    <Link href={`/${slug}/prices`} className="text-sky-600 hover:underline font-medium">
                      Цены в {cities[slug].name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-semibold text-slate-900">Услуги по городам</h2>
            </div>
            <div className="p-6">
              <p className="text-slate-600 text-sm mb-4">
                Пример: Батайск — установка систем очистки воды, умягчение и др.
              </p>
              <ul className="space-y-2 text-slate-600 text-sm">
                {CITY_SLUGS.slice(0, 5).map((citySlug) => (
                  <li key={citySlug}>
                    {cities[citySlug].name}:{" "}
                    {SERVICE_SLUGS.slice(0, 3).map((serviceSlug) => (
                      <Link
                        key={serviceSlug}
                        href={`/${citySlug}/${serviceSlug}`}
                        className="text-sky-600 hover:underline font-medium mr-2"
                      >
                        {services[serviceSlug].titleShort}
                      </Link>
                    ))}
                    …
                  </li>
                ))}
                <li>… и другие города и услуги.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
