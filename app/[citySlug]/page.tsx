import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CITY_SLUGS, getCityBySlug, isCitySlug } from "@/data/cities";
import { IMAGE_PATHS } from "@/lib/image-paths";
import { getServicesForCityPage } from "@/data/services";
import { SOLUTION_SLUGS, solutions } from "@/data/solutions";
import { business } from "@/data/business";
import { getCityHubLead, getCityHubFaq, getCityWaterFeatures, getCityHowWeWork, getPricesLead, getPricesSystemTypes } from "@/lib/content-generator";
import { buildMeta, getServiceJsonLdDynamic, getFAQPageJsonLd, getBreadcrumbJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SeeAlso } from "@/components/SeeAlso";
import { ContactForm } from "@/components/ContactForm";
import { FAQ } from "@/components/FAQ";
import { PricesBlock } from "@/components/PricesBlock";
import { InstallationPhotos } from "@/components/InstallationPhotos";
import { Problems } from "@/components/Problems";
import { Mounting } from "@/components/Mounting";
import { HowWeWork } from "@/components/HowWeWork";
import { Quiz } from "@/components/Quiz";
import { WhyUs } from "@/components/WhyUs";
import { Geography } from "@/components/Geography";
import type { Metadata } from "next";

const PROBLEMS = [
  { name: "Железо и ржавчина", href: "obezzhelezivanie-vody", icon: "M4 6h16M4 12h16M4 18h7" },
  { name: "Жёсткость и накипь", href: "umyagchenie-vody", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
  { name: "Запах сероводорода", href: "aeraciya-vody", icon: "M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" },
  { name: "Мутность и песок", href: "ustanovka-sistem-ochistki-vody", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { name: "Питьевая вода", href: "obratnyj-osmos", icon: "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" },
];

const HOW_WE_WORK_STEPS = [
  { num: "1", title: "Заявка или звонок", text: "Оставляете заявку на сайте или звоните. Уточняем источник воды и задачу." },
  { num: "2", title: "Выезд инженера", text: "Приезжаем на объект, смотрим разводку и место под оборудование. При необходимости берём пробу на анализ." },
  { num: "3", title: "Подбор и расчёт", text: "Рассчитываем схему водоочистки под ваш анализ и бюджет. Направляем КП с оборудованием и монтажом." },
  { num: "4", title: "Договор и доставка", text: "Заключаем договор, согласуем дату. Привозим оборудование и материалы на объект." },
  { num: "5", title: "Монтаж за 1 день", text: "Устанавливаем систему, подключаем, настраиваем. Показываем, как пользоваться и обслуживать." },
  { num: "6", title: "Гарантия и сервис", text: "Передаём документы и гарантию. Остаёмся на связи: сервис, замена картриджей, консультации." },
];

export async function generateStaticParams() {
  return CITY_SLUGS.map((citySlug) => ({ citySlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}): Promise<Metadata> {
  const { citySlug } = await params;
  if (!isCitySlug(citySlug)) return { title: "Страница не найдена" };
  const city = getCityBySlug(citySlug)!;
  const title = `Установка систем очистки воды в ${city.namePrepositional} — под ключ`;
  const description = `Монтаж водоочистки в ${city.namePrepositional}: подбор по анализу, установка за 1 день. Железо, жёсткость, запах, питьевая вода. Гарантия. ${business.brandName}.`;
  const path = `/${citySlug}`;
  const meta = buildMeta(title, description, path);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.alternates.canonical },
    openGraph: meta.openGraph,
  };
}

export default async function CityHubPage({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}) {
  const { citySlug } = await params;
  if (!isCitySlug(citySlug)) notFound();
  const city = getCityBySlug(citySlug)!;

  const lead = getCityHubLead(city.name, citySlug, city.namePrepositional);
  const pricesLeadShort = getPricesLead(city.name, citySlug, city.namePrepositional).split(".").slice(0, 2).join(".").trim() + ".";
  const priceItems = getPricesSystemTypes().slice(0, 3).map((s) => ({ title: s.title, priceLabel: s.priceLabel, image: s.image }));
  const waterFeatures = getCityWaterFeatures(city.name, citySlug, city.namePrepositional);
  const howWeWork = getCityHowWeWork(city.name, citySlug, city.namePrepositional);
  const faq = getCityHubFaq(city.name, citySlug, city.namePrepositional);

  const breadcrumbs = [
    { name: "Главная", url: "/" },
    { name: city.name, url: `/${citySlug}` },
  ];

  const serviceLinks = getServicesForCityPage()
    .slice(0, 6)
    .map((s) => ({
      label: `${s.title} в ${city.namePrepositional}`,
      href: `/${citySlug}/${s.slug}`,
    }));

  const solutionLinks = SOLUTION_SLUGS.map((slug) => ({
    label: `${solutions[slug].title} в ${city.namePrepositional}`,
    href: `/${citySlug}/solutions/${slug}`,
  }));

  const serviceJsonLd = getServiceJsonLdDynamic(
    `Установка систем очистки воды в ${city.name}`,
    lead,
    city.name
  );
  const faqJsonLd = getFAQPageJsonLd(faq);
  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbs);

  return (
    <div className="bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Hero-блок как на главной */}
      <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-br from-sky-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight mb-6">
                Установка систем очистки воды в {city.namePrepositional}
              </h1>
              <p className="text-lg text-slate-700 leading-relaxed mb-8 max-w-3xl">{lead}</p>
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
              <ul className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4" role="list">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600" aria-hidden>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </span>
                  <span className="text-slate-700">Подбор по анализу воды — без переплат</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600" aria-hidden>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </span>
                  <span className="text-slate-700">Монтаж за 1 день в {city.namePrepositional}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600" aria-hidden>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </span>
                  <span className="text-slate-700">Гарантия и сервис</span>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-2 relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
              <Image
                src={IMAGE_PATHS.hero}
                alt={`Водоочистка в ${city.namePrepositional}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-16">
        {/* Услуги в городе — уникальный блок */}
        <section className="mt-8 sm:mt-10">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center" aria-hidden>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </span>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Услуги в {city.namePrepositional}</h2>
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {getServicesForCityPage().map((s) => (
                  <Link
                    key={s.slug}
                    href={`/${citySlug}/${s.slug}`}
                    className="group flex flex-col p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-sky-300 hover:bg-sky-50/30 hover:shadow-md transition-all duration-300"
                  >
                    <span className="font-semibold text-slate-900 group-hover:text-sky-700 transition-colors">{s.title}</span>
                    <p className="text-slate-600 text-sm mt-1 leading-relaxed line-clamp-2">{s.shortDescription}</p>
                    <span className="inline-flex items-center gap-1 text-sky-600 text-sm font-medium mt-3 group-hover:gap-2 transition-all">
                      Подробнее
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Решения в городе — водоочистка по объектам */}
        <section className="mt-8 sm:mt-10">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center" aria-hidden>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </span>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Решения в {city.namePrepositional}</h2>
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {solutionLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex flex-col p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-emerald-300 hover:bg-emerald-50/30 hover:shadow-md transition-all duration-300"
                  >
                    <span className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">{link.label}</span>
                    <span className="inline-flex items-center gap-1 text-emerald-600 text-sm font-medium mt-3 group-hover:gap-2 transition-all">
                      Подробнее
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <PricesBlock
          lead={pricesLeadShort}
          pricesHref={`/${citySlug}/prices`}
          linkLabel={`Цены в ${city.namePrepositional}`}
          items={priceItems}
        />

        <Problems citySlug={citySlug} />
        <Mounting />
        <HowWeWork />
        <Quiz commentPrefix={`Интересует: установка в ${city.namePrepositional}`} />
        <WhyUs />
        <Geography />

        {/* Особенности воды в городе — уникальный блок */}
        <section className="mt-8 sm:mt-10">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center" aria-hidden>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </span>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Особенности воды в {city.namePrepositional}</h2>
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {waterFeatures.split(/(?<=\.)\s+/).filter((s) => s.trim().length > 20).slice(0, 6).map((para, i) => (
                  <div
                    key={i}
                    className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-sky-200 hover:bg-sky-50/30 hover:shadow-sm transition-all duration-300"
                  >
                    <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0" aria-hidden>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                    </span>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed pt-0.5 min-w-0">{para.trim()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Как мы работаем в городе — уникальный блок */}
        <section className="mt-8 sm:mt-10">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center" aria-hidden>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </span>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Как мы работаем в {city.namePrepositional}</h2>
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
                {HOW_WE_WORK_STEPS.map((step) => (
                  <div
                    key={step.num}
                    className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-sky-200 hover:shadow-sm transition-all duration-300"
                  >
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-600 text-white font-semibold flex items-center justify-center text-sm shadow-sm">
                      {step.num}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-900 text-sm sm:text-base">{step.title}</h3>
                      <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                {howWeWork.split(/(?<=\.)\s+/).filter(Boolean)[0]?.trim()}
              </p>
            </div>
          </div>
        </section>

        {/* Популярные проблемы воды в городе — уникальный блок */}
        <section className="mt-8 sm:mt-10">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center" aria-hidden>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </span>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Популярные проблемы воды в {city.namePrepositional}</h2>
            </div>
            <div className="p-4 sm:p-6">
              <ul className="flex flex-wrap gap-2 sm:gap-3">
                {PROBLEMS.map((p) => (
                  <Link
                    key={p.href}
                    href={`/${citySlug}/${p.href}`}
                    className="group inline-flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 text-slate-700 text-sm hover:border-sky-400 hover:bg-sky-50 hover:text-sky-600 transition-all duration-300"
                  >
                    <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center group-hover:bg-sky-200 transition-colors" aria-hidden>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={p.icon} /></svg>
                    </span>
                    <span className="font-medium">{p.name}</span>
                    <svg className="w-4 h-4 text-slate-400 group-hover:text-sky-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <InstallationPhotos embedded />

        <FAQ items={faq} subtitle={`Краткие ответы на типичные вопросы по установке и обслуживанию в ${city.namePrepositional}.`} />

        <SeeAlso title="Услуги в этом городе" links={serviceLinks} />

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
                Оставьте имя и телефон — перезвоним и согласуем выезд в {city.namePrepositional}. Или напишите нам в мессенджер.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <p className="font-semibold text-slate-900">{business.addressText}</p>
                  <p className="flex items-center gap-2">
                    <span className="text-slate-500" aria-hidden>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </span>
                    <span className="text-slate-700">{business.addressText}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-slate-500" aria-hidden>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </span>
                    <a href={`tel:${business.phoneRaw}`} className="text-sky-600 font-medium hover:underline">
                      {business.phone}
                    </a>
                  </p>
                  <p className="text-slate-500 text-sm">{business.openingHours}</p>
                  <a
                    href={`https://wa.me/${business.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Написать в WhatsApp
                  </a>
                </div>
                <div className="max-w-md">
                  <ContactForm comment={`Интересует: установка в ${city.namePrepositional}`} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
