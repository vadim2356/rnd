import Link from "next/link";
import Image from "next/image";
import { CITY_SLUGS, cities } from "@/data/cities";
import { business } from "@/data/business";
import {
  getPricesLeadMain,
  getPricesSystemTypes,
  getPricesWhatAffects,
  getPricesFaq,
} from "@/lib/content-generator";
import { buildMeta, getServiceJsonLdDynamic, getFAQPageJsonLd, getBreadcrumbJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SeeAlso } from "@/components/SeeAlso";
import { ContactForm } from "@/components/ContactForm";
import { FAQ } from "@/components/FAQ";
import { ExpandablePriceDetails } from "@/components/ExpandablePriceDetails";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Цены на установку систем очистки воды — Ростов-на-Дону",
  description:
    "Ориентировочные цены на монтаж водоочистки под ключ. Эконом, Оптимум, Премиум. Ростов-на-Дону и Ростовская область. Точный расчёт после выезда.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://water-rostov.ru"}/prices`,
  },
};

export default function PricesPage() {
  const lead = getPricesLeadMain();
  const systemTypes = getPricesSystemTypes();
  const whatAffects = getPricesWhatAffects("main-prices");
  const faq = getPricesFaq("Ростове-на-Дону", "main-prices");

  const breadcrumbs = [
    { name: "Главная", url: "/" },
    { name: "Цены", url: "/prices" },
  ];

  const cityLinks = CITY_SLUGS.slice(0, 8).map((citySlug) => ({
    label: `Цены в ${cities[citySlug].name}`,
    href: `/${citySlug}/prices`,
  }));

  const serviceJsonLd = getServiceJsonLdDynamic(
    "Установка систем очистки воды — цены",
    lead,
    "Ростов-на-Дону"
  );
  const faqJsonLd = getFAQPageJsonLd(faq);
  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbs);

  return (
    <div className="bg-slate-50 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-4 sm:py-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <section className="relative py-8 sm:py-12 md:py-16 overflow-hidden bg-gradient-to-br from-sky-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight mb-4 sm:mb-6">
            Цены на установку систем очистки воды
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6 sm:mb-8">{lead}</p>
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
            <a href="#contacts" className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-slate-300 text-slate-700 font-medium hover:border-sky-500 hover:text-sky-600 transition">
              Заказать расчёт
            </a>
          </div>
          <p className="text-slate-500 text-sm mt-4">{business.openingHours}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-10 sm:pb-16">
        <section className="mt-6 sm:mt-10">
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Типы систем</h2>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-6 sm:space-y-8">
                {systemTypes.map((sys, i) => (
                  <div
                    key={sys.title}
                    className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 overflow-hidden ${i === 1 ? "border-sky-200 bg-sky-50/30" : "border-slate-200 bg-slate-50/50"}`}
                  >
                    {sys.image ? (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,320px)_1fr] lg:grid-cols-[minmax(0,380px)_1fr] gap-4 sm:gap-6 items-start">
                          <div>
                            <div className="relative aspect-video w-full rounded-lg sm:rounded-xl overflow-hidden bg-slate-100 min-h-[200px] sm:min-h-0">
                              <Image
                                src={sys.image}
                                alt={sys.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 320px, 380px"
                              />
                            </div>
                            <p className="text-lg sm:text-xl font-bold text-sky-600 mt-3 sm:mt-4">{sys.priceLabel}</p>
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">{sys.title}</h3>
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
                                    <span className="text-sky-500 mt-0.5 flex-shrink-0">•</span>
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
                                    <span className="text-sky-500 mt-0.5 flex-shrink-0">•</span>
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
                                    <span className="text-emerald-500 mt-0.5 flex-shrink-0">✔</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {sys.applications && sys.applications.length > 0 && (
                            <div>
                              <p className="font-medium text-slate-800 text-sm mb-2">Где применяется</p>
                              <div className="space-y-3 text-slate-600 text-sm">
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
                                    <span className="text-sky-500 mt-0.5 flex-shrink-0">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                              {sys.equipmentOptional && sys.equipmentOptional.length > 0 && (
                                <>
                                  <p className="font-medium text-slate-700 text-sm mb-1 mt-3">Дополнительно может устанавливаться:</p>
                                  <ul className="space-y-1.5 text-slate-600 text-sm">
                                    {sys.equipmentOptional.map((item) => (
                                      <li key={item} className="flex gap-2">
                                        <span className="text-sky-500 mt-0.5 flex-shrink-0">•</span>
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
                                    <span className="text-sky-500 mt-0.5 flex-shrink-0">•</span>
                                    <span>{t}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-slate-800 text-sm mb-2">Разновидности</p>
                              <div className="flex flex-wrap gap-2">
                                {sys.varieties.map((v) => (
                                  <span key={v} className="inline-block px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs">
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
                        <div className="flex flex-wrap items-baseline justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                          <h3 className="text-base sm:text-lg font-semibold text-slate-900">{sys.title}</h3>
                          <span className="text-lg sm:text-xl font-bold text-sky-600 whitespace-nowrap">{sys.priceLabel}</span>
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed mb-3 sm:mb-4">{sys.description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <p className="font-medium text-slate-800 text-sm mb-2">Типы и исполнение</p>
                            <ul className="space-y-1.5 text-slate-600 text-sm">
                              {sys.types.map((t) => (
                                <li key={t} className="flex gap-2">
                                  <span className="text-sky-500 mt-0.5 flex-shrink-0">•</span>
                                  <span>{t}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium text-slate-800 text-sm mb-2">Разновидности</p>
                            <div className="flex flex-wrap gap-2">
                              {sys.varieties.map((v) => (
                                <span
                                  key={v}
                                  className="inline-block px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs"
                                >
                                  {v}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 sm:mt-10">
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Что влияет на стоимость</h2>
            </div>
            <div className="p-4 sm:p-6">
              <p className="text-slate-700 leading-relaxed">{whatAffects}</p>
            </div>
          </div>
        </section>

        <FAQ items={faq} />

        <SeeAlso title="Цены в городах области" links={cityLinks} />

        <section id="contacts" className="mt-8 sm:mt-12 scroll-mt-20">
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Заказать расчёт</h2>
            </div>
            <div className="p-4 sm:p-6 md:p-8">
              <p className="text-slate-600 mb-6">
                Оставьте имя и телефон — перезвоним и подготовим ориентировочный или точный расчёт под ваш объект. Или напишите в WhatsApp.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <p className="font-semibold text-slate-900">{business.addressText}</p>
                  <p className="flex items-center gap-2 text-slate-700">
                    <span className="text-slate-500" aria-hidden>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </span>
                    {business.addressText}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-slate-500" aria-hidden>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </span>
                    <a href={`tel:${business.phoneRaw}`} className="text-sky-600 font-medium hover:underline">{business.phone}</a>
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
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
