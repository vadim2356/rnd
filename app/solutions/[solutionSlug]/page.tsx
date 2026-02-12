import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getSolutionBySlug, SOLUTION_SLUGS } from "@/data/solutions";
import { CITY_SLUGS, cities } from "@/data/cities";
import { business } from "@/data/business";
import { getPricesLeadMain, getPricesSystemTypes } from "@/lib/content-generator";
import { buildMeta, getServiceJsonLdDynamic, getBreadcrumbJsonLd } from "@/lib/seo";
import { IMAGE_PATHS } from "@/lib/image-paths";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SeeAlso } from "@/components/SeeAlso";
import { ContactForm } from "@/components/ContactForm";
import { Problems } from "@/components/Problems";
import { Mounting } from "@/components/Mounting";
import { HowWeWork } from "@/components/HowWeWork";
import { PricesBlock } from "@/components/PricesBlock";
import { Quiz } from "@/components/Quiz";
import { WhyUs } from "@/components/WhyUs";
import { Geography } from "@/components/Geography";
import { InstallationPhotos } from "@/components/InstallationPhotos";
import { FAQ } from "@/components/FAQ";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return SOLUTION_SLUGS.map((solutionSlug) => ({ solutionSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ solutionSlug: string }>;
}): Promise<Metadata> {
  const { solutionSlug } = await params;
  const solution = getSolutionBySlug(solutionSlug);
  if (!solution) return { title: "Страница не найдена" };
  const title = `${solution.metaTitle} в Ростове-на-Дону — под ключ`;
  const description = `${solution.description.slice(0, 140)} ${business.brandName}.`;
  const path = `/solutions/${solutionSlug}`;
  const meta = buildMeta(title, description, path);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.alternates.canonical },
    openGraph: meta.openGraph,
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ solutionSlug: string }>;
}) {
  const { solutionSlug } = await params;
  const solution = getSolutionBySlug(solutionSlug);
  if (!solution) notFound();

  const pricesLead = getPricesLeadMain().split(".").slice(0, 2).join(".").trim() + ".";
  const priceItems = getPricesSystemTypes().slice(0, 3).map((s) => ({
    title: s.title,
    priceLabel: s.priceLabel,
  }));

  const breadcrumbs = [
    { name: "Главная", url: "/" },
    { name: "Решения", url: "/solutions" },
    { name: solution.title, url: `/solutions/${solutionSlug}` },
  ];

  const cityLinks = CITY_SLUGS.slice(0, 8).map((citySlug) => ({
    label: `${solution.titleShort} в ${cities[citySlug].name}`,
    href: `/${citySlug}/solutions/${solutionSlug}`,
  }));

  const serviceJsonLd = getServiceJsonLdDynamic(
    `${solution.title} в Ростове-на-Дону`,
    solution.description,
    "Ростов-на-Дону"
  );
  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbs);

  return (
    <div className="bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-br from-sky-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight mb-6">
                {solution.title} в Ростове-на-Дону и области
              </h1>
              <p className="text-lg text-slate-700 leading-relaxed mb-8 max-w-3xl">{solution.description}</p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`tel:${business.phoneRaw}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition shadow-lg shadow-sky-600/20"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {business.phone}
                </a>
                <a
                  href="#contacts"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-slate-300 text-slate-700 font-medium hover:border-sky-500 hover:text-sky-600 transition"
                >
                  Оставить заявку
                </a>
              </div>
              <p className="text-slate-500 text-sm mt-4">{business.openingHours}</p>
            </div>
            <div className="lg:col-span-2 relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
              <Image
                src={IMAGE_PATHS.hero}
                alt={`${solution.title} — системы очистки воды`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-16">
        {/* Объекты и источники воды — уникальный блок решений */}
        <section className="mt-8 sm:mt-10">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center" aria-hidden>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </span>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Объекты и источники воды</h2>
            </div>
            <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  Для каких объектов
                </p>
                <ul className="flex flex-wrap gap-2 sm:gap-3">
                  {solution.objects.map((o) => (
                    <li
                      key={o}
                      className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 text-sm sm:text-base hover:border-sky-200 hover:bg-sky-50/30 transition-all duration-300"
                    >
                      <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                      </span>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  Источники воды
                </p>
                <ul className="flex flex-wrap gap-2 sm:gap-3">
                  {solution.sources.map((s) => (
                    <li
                      key={s}
                      className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 text-sm sm:text-base hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-300"
                    >
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <Problems />
        <Mounting />
        <HowWeWork />
        <PricesBlock
          lead={pricesLead}
          pricesHref="/prices"
          linkLabel="Подробнее о ценах"
          items={priceItems}
        />
        <Quiz commentPrefix={`Интересует: ${solution.title}`} />
        <WhyUs />
        <Geography />
        <InstallationPhotos id="installations" />

        <div className="mt-10">
          <FAQ />
        </div>

        <SeeAlso title="Решения в городах области" links={cityLinks} />

        <section id="contacts" className="mt-12 scroll-mt-20">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center" aria-hidden>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </span>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Оставить заявку</h2>
            </div>
            <div className="p-6 md:p-8">
              <p className="text-slate-600 mb-6">
                Оставьте заявку на {solution.titleShort} — перезвоним и подготовим расчёт под ваш объект.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl">
                <div>
                  <p className="font-semibold text-slate-900">Ростов-на-Дону</p>
                  <a href={`tel:${business.phoneRaw}`} className="text-sky-600 text-lg font-medium hover:underline">
                    {business.phone}
                  </a>
                  <p className="text-slate-500 text-sm mt-2">{business.openingHours}</p>
                </div>
                <div className="max-w-md">
                  <ContactForm comment={`Интересует: ${solution.title}`} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
