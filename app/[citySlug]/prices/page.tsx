import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CITY_SLUGS, getCityBySlug, isCitySlug } from "@/data/cities";
import { business } from "@/data/business";
import {
  getPricesLead,
  getPricesSystemTypes,
  getPricesWhatAffects,
  getPricesFaq,
} from "@/lib/content-generator";
import { buildMeta, getServiceJsonLdDynamic, getFAQPageJsonLd, getBreadcrumbJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SeeAlso } from "@/components/SeeAlso";
import { ContactForm } from "@/components/ContactForm";
import { ExpandablePriceDetails } from "@/components/ExpandablePriceDetails";
import { FAQ } from "@/components/FAQ";
import type { Metadata } from "next";

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
  const title = `Цены на установку систем очистки воды в ${city.namePrepositional}`;
  const description = `Ориентировочные цены на монтаж водоочистки в ${city.namePrepositional}${citySlug === "rostov-na-donu" ? " и области" : ""}: умягчение, комплексная очистка от железа, обратный осмос. Точный расчёт после выезда. ${business.brandName}.`;
  const path = `/${citySlug}/prices`;
  const meta = buildMeta(title, description.slice(0, 160), path);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.alternates.canonical },
    openGraph: meta.openGraph,
  };
}

export default async function CityPricesPage({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}) {
  const { citySlug } = await params;
  if (!isCitySlug(citySlug)) notFound();
  const city = getCityBySlug(citySlug)!;

  const lead = getPricesLead(city.name, citySlug, city.namePrepositional);
  const systemTypes = getPricesSystemTypes();
  const whatAffects = getPricesWhatAffects(citySlug);
  const faq = getPricesFaq(city.name, citySlug, city.namePrepositional);

  const breadcrumbs = [
    { name: "Главная", url: "/" },
    { name: city.name, url: `/${citySlug}` },
    { name: "Цены", url: `/${citySlug}/prices` },
  ];

  const seeAlsoLinks = [
    { label: "Услуги в городе", href: `/${citySlug}` },
    { label: "Цены по области", href: "/prices" },
  ];

  const serviceJsonLd = getServiceJsonLdDynamic(
    `Цены на установку систем очистки воды в ${city.namePrepositional}`,
    lead,
    city.name
  );
  const faqJsonLd = getFAQPageJsonLd(faq);
  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbs);

  return (
    <article className="py-6 sm:py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <Breadcrumbs items={breadcrumbs} />
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

        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">
          Цены на установку систем очистки воды в {city.namePrepositional}
        </h1>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6 sm:mb-8">{lead}</p>

        <p className="font-semibold text-slate-900 mb-2">
          <a href={`tel:${business.phoneRaw}`} className="text-sky-600 hover:underline">
            {business.phone}
          </a>
        </p>
        <p className="text-slate-500 text-sm mb-6 sm:mb-10">{business.openingHours}</p>

        <section className="mb-6 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 sm:mb-4">Типы систем</h2>
          <div className="space-y-4 sm:space-y-6">
            {systemTypes.map((sys, i) => (
              <div
                key={sys.title}
                className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 ${i === 1 ? "border-sky-200 bg-sky-50/30" : "border-slate-200 bg-slate-50/50"}`}
              >
                {sys.image ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-[minmax(0,280px)_1fr] lg:grid-cols-[minmax(0,340px)_1fr] gap-4 sm:gap-5 items-start">
                      <div className="w-full">
                        <div className="relative aspect-[3/4] w-full max-w-[340px] rounded-lg sm:rounded-xl overflow-hidden bg-slate-100">
                          <Image
                            src={sys.image}
                            alt={sys.title}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 280px, 340px"
                          />
                        </div>
                        <p className="text-lg font-bold text-sky-600 mt-3">{sys.priceLabel}</p>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">{sys.title}</h3>
                        <p className="text-slate-700 text-sm leading-relaxed">{sys.description}</p>
                      </div>
                    </div>
                    <ExpandablePriceDetails>
                      {sys.principleWork && sys.principleWork.length > 0 && (
                        <div>
                          <p className="font-medium text-slate-800 text-sm mb-2">Принцип работы</p>
                          <ul className="space-y-1.5 text-slate-600 text-sm">
                            {sys.principleWork.map((item) => (
                              <li key={item} className="flex gap-2">
                                <span className="text-sky-500 flex-shrink-0">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {sys.characteristics && sys.characteristics.length > 0 && (
                        <div>
                          <p className="font-medium text-slate-800 text-sm mb-2">Основные характеристики</p>
                          <ul className="space-y-1.5 text-slate-600 text-sm">
                            {sys.characteristics.map((item) => (
                              <li key={item} className="flex gap-2">
                                <span className="text-sky-500 flex-shrink-0">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {sys.advantages && sys.advantages.length > 0 && (
                        <div>
                          <p className="font-medium text-slate-800 text-sm mb-2">Преимущества системы</p>
                          <ul className="space-y-1.5 text-slate-600 text-sm">
                            {sys.advantages.map((item) => (
                              <li key={item} className="flex gap-2">
                                <span className="text-emerald-500 flex-shrink-0">✔</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {sys.applications && sys.applications.length > 0 && (
                        <div>
                          <p className="font-medium text-slate-800 text-sm mb-2">Где применяется</p>
                          <div className="space-y-2 text-slate-600 text-sm">
                            {sys.applications.map((app) => (
                              <div key={app.subtitle}>
                                <p className="font-medium text-slate-800">{app.subtitle}</p>
                                <p className="mt-0.5 leading-relaxed">{app.text}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {(sys.equipment?.length ?? 0) > 0 && (
                        <div>
                          <p className="font-medium text-slate-800 text-sm mb-2">Комплектация</p>
                          <ul className="space-y-1.5 text-slate-600 text-sm mb-2">
                            {sys.equipment!.map((item) => (
                              <li key={item} className="flex gap-2">
                                <span className="text-sky-500 flex-shrink-0">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                          {sys.equipmentOptional && sys.equipmentOptional.length > 0 && (
                            <>
                              <p className="font-medium text-slate-700 text-sm mb-1 mt-2">Дополнительно может устанавливаться:</p>
                              <ul className="space-y-1.5 text-slate-600 text-sm">
                                {sys.equipmentOptional.map((item) => (
                                  <li key={item} className="flex gap-2">
                                    <span className="text-sky-500 flex-shrink-0">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
                        </div>
                      )}
                      {sys.mountingLaunch && (
                        <div>
                          <p className="font-medium text-slate-800 text-sm mb-2">Монтаж и запуск</p>
                          <p className="text-slate-600 text-sm leading-relaxed">{sys.mountingLaunch}</p>
                        </div>
                      )}
                      {sys.servicing && (
                        <div>
                          <p className="font-medium text-slate-800 text-sm mb-2">Обслуживание</p>
                          <p className="text-slate-600 text-sm leading-relaxed">{sys.servicing}</p>
                        </div>
                      )}
                      {sys.faq && sys.faq.length > 0 && (
                        <div>
                          <p className="font-medium text-slate-800 text-sm mb-2">FAQ</p>
                          <div className="space-y-3 text-slate-600 text-sm">
                            {sys.faq.map((item, idx) => (
                              <div key={idx}>
                                <p className="font-medium text-slate-800">{item.question}</p>
                                <p className="mt-0.5 leading-relaxed">{item.answer}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium text-slate-800 text-sm mb-2">Типы и исполнение</p>
                          <ul className="space-y-1.5 text-slate-600 text-sm">
                            {sys.types.map((t) => (
                              <li key={t} className="flex gap-2">
                                <span className="text-sky-500 flex-shrink-0">•</span>
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 text-sm mb-2">Разновидности</p>
                          <div className="flex flex-wrap gap-2">
                            {sys.varieties.map((v) => (
                              <span key={v} className="inline-block px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs">
                                {v}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </ExpandablePriceDetails>
                  </>
                ) : (
                  <>
                    <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900">{sys.title}</h3>
                      <span className="text-lg font-bold text-sky-600 whitespace-nowrap">{sys.priceLabel}</span>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed mb-3 sm:mb-4">{sys.description}</p>
                    <div className="border-t border-slate-200 pt-4 mt-4">
                      <p className="font-medium text-slate-800 text-sm mb-2">Типы и исполнение</p>
                      <ul className="space-y-1.5 text-slate-600 text-sm mb-3">
                        {sys.types.map((t) => (
                          <li key={t} className="flex gap-2">
                            <span className="text-sky-500 flex-shrink-0">•</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="font-medium text-slate-800 text-sm mb-2">Разновидности</p>
                      <div className="flex flex-wrap gap-2">
                        {sys.varieties.map((v) => (
                          <span key={v} className="inline-block px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs">
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 sm:mb-4">Что влияет на стоимость</h2>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">{whatAffects}</p>
        </section>

        <FAQ items={faq} />

        <SeeAlso title="Смотрите также" links={seeAlsoLinks} />

        <section id="contacts" className="mt-8 sm:mt-12 pt-8 sm:pt-10 border-t border-slate-200 scroll-mt-20">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 sm:mb-4">Заказать расчёт</h2>
          <p className="text-slate-600 text-sm sm:text-base mb-4">
            Оставьте имя и телефон — перезвоним и подготовим расчёт под ваш объект в {city.namePrepositional}.
          </p>
          <div className="w-full max-w-md">
            <ContactForm />
          </div>
        </section>
      </div>
    </article>
  );
}
