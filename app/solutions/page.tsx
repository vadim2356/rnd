import Link from "next/link";
import { SOLUTION_SLUGS, solutions } from "@/data/solutions";
import { getSolutionsIndexContent } from "@/lib/content-generator";
import { getFAQPageJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Решения по объектам — дом, квартира, скважина, бизнес",
  description:
    "Водоочистка для частного дома, квартиры, из скважины, для бизнеса и HoReCa. Ростов-на-Дону и Ростовская область.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://water-rostov.ru"}/solutions`,
  },
};

export default function SolutionsIndexPage() {
  const breadcrumbs = [
    { name: "Главная", url: "/" },
    { name: "Решения", url: "/solutions" },
  ];
  const { sections, faq } = getSolutionsIndexContent();
  const faqJsonLd = getFAQPageJsonLd(faq);

  return (
    <div className="bg-slate-50 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-br from-sky-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight mb-6">
            Решения по объектам
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed mb-8 max-w-3xl">
            Подбираем схему водоочистки под тип объекта и источник воды: частный дом, квартира, скважина, бизнес и HoReCa.
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
              <h2 className="text-xl font-semibold text-slate-900">Решения</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SOLUTION_SLUGS.map((slug) => {
                  const s = solutions[slug];
                  return (
                    <Link
                      key={slug}
                      href={`/solutions/${slug}`}
                      className="block p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-sky-300 hover:shadow-md transition"
                    >
                      <span className="font-semibold text-slate-900">{s.title}</span>
                      <p className="text-slate-600 text-sm mt-2 leading-relaxed">{s.description}</p>
                      <span className="text-sky-600 text-sm font-medium mt-2 inline-block">Подробнее →</span>
                    </Link>
                  );
                })}
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
                Оставить заявку на расчёт можно на{" "}
                <Link href="/" className="text-sky-600 hover:underline font-medium">главной странице</Link>.
                Ориентировочные цены — на странице{" "}
                <Link href="/prices" className="text-sky-600 hover:underline font-medium">Цены</Link>.
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
