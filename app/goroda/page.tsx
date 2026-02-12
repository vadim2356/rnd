import Link from "next/link";
import { CITY_SLUGS, cities } from "@/data/cities";
import { getServicesForCityPage } from "@/data/services";
import { getGorodaIndexContent } from "@/lib/content-generator";
import { getFAQPageJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Города — установка систем очистки воды в Ростовской области",
  description:
    "Выезд и монтаж водоочистки: Ростов-на-Дону, Батайск, Аксай, Азов, Таганрог, Новочеркасск, Шахты и другие города области.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://water-rostov.ru"}/goroda`,
  },
};

export default function GorodaPage() {
  const breadcrumbs = [
    { name: "Главная", url: "/" },
    { name: "Города", url: "/goroda" },
  ];
  const services = getServicesForCityPage();
  const { sections, faq } = getGorodaIndexContent();
  const faqJsonLd = getFAQPageJsonLd(faq);

  return (
    <div className="bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-br from-sky-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight mb-6">
            Города выезда
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed mb-8 max-w-3xl">
            Работаем в Ростове-на-Дону и по всей Ростовской области. Установка систем очистки воды под ключ в перечисленных городах.
          </p>
          <Link
            href="/#contacts"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition shadow-lg shadow-sky-600/20"
          >
            Оставить заявку
          </Link>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-16">
        <section className="mt-10">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-semibold text-slate-900">Города области</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {CITY_SLUGS.map((slug) => (
                  <Link
                    key={slug}
                    href={`/${slug}`}
                    className="group flex items-center gap-4 p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-sky-300 hover:shadow-md transition"
                  >
                    <span className="flex w-10 h-10 rounded-lg bg-sky-100 text-sky-600 items-center justify-center shrink-0 group-hover:bg-sky-200 transition">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <span className="font-semibold text-slate-900 group-hover:text-sky-600 transition">
                        {cities[slug].name}
                      </span>
                      <p className="text-slate-500 text-sm mt-0.5">Водоочистка под ключ</p>
                    </div>
                    <span className="ml-auto text-slate-400 group-hover:text-sky-500 transition" aria-hidden>→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {sections.map((sec) => (
          <section key={sec.h2} className="mt-10">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-xl font-semibold text-slate-900">{sec.h2}</h2>
              </div>
              <div className="p-6">
                <p className="text-slate-700 leading-relaxed">{sec.text}</p>
              </div>
            </div>
          </section>
        ))}

        <section className="mt-10">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-semibold text-slate-900">Полезные ссылки</h2>
            </div>
            <div className="p-6">
              <p className="text-slate-700 mb-4">
                Ориентировочные цены на монтаж — на странице{" "}
                <Link href="/prices" className="text-sky-600 hover:underline font-medium">Цены</Link>.
                Полный перечень{" "}
                <Link href="/services" className="text-sky-600 hover:underline font-medium">услуг</Link>{" "}
                — в соответствующем разделе.
              </p>
              <p className="text-slate-600 text-sm mb-4">
                В каждом городе доступны: {services.slice(0, 4).map((s) => s.titleShort).join(", ")} и другие услуги.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-sky-600 text-white text-sm font-medium hover:bg-sky-700 transition"
              >
                На главную
              </Link>
            </div>
          </div>
        </section>

        <FAQ items={faq} />
      </div>
    </div>
  );
}
