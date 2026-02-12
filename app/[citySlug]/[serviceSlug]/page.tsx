import { notFound } from "next/navigation";
import Link from "next/link";
import { getCityBySlug, isCitySlug, CITY_SLUGS } from "@/data/cities";
import { getServiceBySlug, getServicesForCityPage, SERVICE_SLUGS } from "@/data/services";
import { business } from "@/data/business";
import {
  getHeroLead,
  getLeadParagraph,
  getWhenNeeded,
  getHowMounting,
  getFaq,
  getPricesLead,
  getPricesSystemTypes,
} from "@/lib/content-generator";
import { buildMeta, getServiceJsonLdDynamic, getFAQPageJsonLd, getBreadcrumbJsonLd } from "@/lib/seo";
import { getServiceHeroImage } from "@/lib/image-paths";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SeeAlso } from "@/components/SeeAlso";
import { ContactForm } from "@/components/ContactForm";
import { InstallationPhotos } from "@/components/InstallationPhotos";
import { ServiceHero } from "@/components/ServiceHero";
import { Problems } from "@/components/Problems";
import { Mounting } from "@/components/Mounting";
import { HowWeWork } from "@/components/HowWeWork";
import { PricesBlock } from "@/components/PricesBlock";
import { Quiz } from "@/components/Quiz";
import { WhyUs } from "@/components/WhyUs";
import { Geography } from "@/components/Geography";
import { FAQ } from "@/components/FAQ";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const params: { citySlug: string; serviceSlug: string }[] = [];
  for (const citySlug of CITY_SLUGS) {
    for (const serviceSlug of SERVICE_SLUGS) {
      params.push({ citySlug, serviceSlug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ citySlug: string; serviceSlug: string }>;
}): Promise<Metadata> {
  const { citySlug, serviceSlug } = await params;
  if (!isCitySlug(citySlug)) return { title: "Страница не найдена" };
  const city = getCityBySlug(citySlug)!;
  const service = getServiceBySlug(serviceSlug);
  if (!service) return { title: "Страница не найдена" };
  const title = `${service.title} в ${city.namePrepositional} — под ключ`;
  const description = `${service.shortDescription} ${city.name} и ${city.region}. Монтаж водоочистки под ключ. ${business.brandName}.`;
  const path = `/${citySlug}/${serviceSlug}`;
  const meta = buildMeta(title, description.slice(0, 160), path);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.alternates.canonical },
    openGraph: meta.openGraph,
  };
}

function splitParagraphs(text: string): string[] {
  return text.split(/(?<=\.)\s+/).filter((s) => s.trim());
}

export default async function CityServicePage({
  params,
}: {
  params: Promise<{ citySlug: string; serviceSlug: string }>;
}) {
  const { citySlug, serviceSlug } = await params;
  if (!isCitySlug(citySlug)) notFound();
  const city = getCityBySlug(citySlug)!;
  const service = getServiceBySlug(serviceSlug);
  if (!service) notFound();

  const vars = {
    cityName: city.name,
    cityNameGenitive: city.nameGenitive,
    region: city.region,
    serviceTitle: service.title,
    serviceShortDescription: service.shortDescription,
    brandName: business.brandName,
    regionSuffix: citySlug === "rostov-na-donu" ? " и области" : "",
    cityNamePrepositional: city.namePrepositional,
    regionGenitive: "Ростовской области",
  };

  const seedKey = `${citySlug}-${serviceSlug}`;
  const heroLead = getHeroLead(seedKey, vars);
  const leadParagraph = getLeadParagraph(seedKey, vars);
  const whenNeeded = getWhenNeeded(seedKey, vars);
  const howMounting = getHowMounting(seedKey, vars);
  const faq = getFaq(seedKey, service.faqCount, vars);

  const pricesLeadShort = getPricesLead(city.name, citySlug, city.namePrepositional).split(".").slice(0, 2).join(".").trim() + ".";
  const priceItems = getPricesSystemTypes().slice(0, 3).map((s) => ({
    title: s.title,
    priceLabel: s.priceLabel,
    image: s.image,
  }));

  const breadcrumbs = [
    { name: "Главная", url: "/" },
    { name: city.name, url: `/${citySlug}` },
    { name: service.title, url: `/${citySlug}/${serviceSlug}` },
  ];

  const otherServices = getServicesForCityPage().filter((s) => s.slug !== serviceSlug).slice(0, 5);
  const serviceLinks = otherServices.map((s) => ({
    label: `${s.title} в ${city.name}`,
    href: `/${citySlug}/${s.slug}`,
  }));

  const serviceJsonLd = getServiceJsonLdDynamic(
    `${service.title} в ${city.namePrepositional}`,
    heroLead,
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-4 sm:py-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <ServiceHero
        title={`${service.title} в ${city.namePrepositional}`}
        lead={`${heroLead} ${leadParagraph}`}
        imageSrc={getServiceHeroImage(serviceSlug)}
        imageAlt={`${service.title} — ${city.name}`}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-10 sm:pb-16">
        {/* Когда нужна услуга — уникальный блок услуги */}
        <section className="mt-6 sm:mt-10">
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center" aria-hidden>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </span>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Когда нужна услуга</h2>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                {splitParagraphs(whenNeeded).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Как проходит монтаж — уникальный блок услуги */}
        <section className="mt-6 sm:mt-10">
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center" aria-hidden>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </span>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Как проходит монтаж</h2>
            </div>
            <div className="p-4 sm:p-6">
              <ol className="space-y-3 sm:space-y-4 mb-6">
                {service.steps.map((step, i) => (
                  <li key={i} className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-slate-100 bg-slate-50/30 hover:border-sky-200 hover:bg-sky-50/20 transition-all duration-300">
                    <span className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-sky-600 text-white flex items-center justify-center text-sm font-semibold shadow-sm">
                      {i + 1}
                    </span>
                    <span className="text-slate-700 text-sm sm:text-base pt-0.5 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="space-y-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                {splitParagraphs(howMounting).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Что входит — уникальный блок услуги */}
        <section className="mt-6 sm:mt-10">
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center" aria-hidden>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </span>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Что входит</h2>
            </div>
            <div className="p-4 sm:p-6">
              <ul className="space-y-3 sm:space-y-4">
                {service.whatIncluded.map((item) => (
                  <li key={item} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-slate-100 bg-slate-50/30 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all duration-300">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </span>
                    <span className="text-slate-700 text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <Problems />
        <Mounting
          cityNamePrepositional={city.namePrepositional}
          formComment={`Рассчитать стоимость (блок Монтаж под ключ) — ${city.name}, ${service.title}`}
        />
        <HowWeWork />
        <PricesBlock
          lead={pricesLeadShort}
          pricesHref={`/${citySlug}/prices`}
          linkLabel={`Цены в ${city.namePrepositional}`}
          items={priceItems}
        />
        <Quiz commentPrefix={`Интересует: ${service.title} в ${city.namePrepositional}`} />
        <WhyUs />
        <Geography />

        <FAQ items={faq} />

        <InstallationPhotos embedded />

        <SeeAlso title="Другие услуги в этом городе" links={serviceLinks} />

        <section id="contacts" className="mt-8 sm:mt-12 scroll-mt-20">
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center" aria-hidden>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </span>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Оставить заявку</h2>
            </div>
            <div className="p-4 sm:p-6 md:p-8">
              <p className="text-slate-600 mb-6">
                Оставьте имя и телефон — перезвоним и согласуем выезд в {city.namePrepositional}.
              </p>
              <div className="max-w-md">
                <ContactForm comment={`Интересует: ${service.title} в ${city.namePrepositional}`} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
