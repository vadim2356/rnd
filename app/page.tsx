import Image from "next/image";
import {
  getLocalBusinessJsonLd,
  getServiceJsonLd,
  getFAQPageJsonLd,
  getBreadcrumbJsonLd,
  FAQ_DATA,
  SITE_URL,
} from "@/lib/seo";
import { IMAGE_PATHS } from "@/lib/image-paths";
import { Hero } from "@/components/Hero";
import { Problems } from "@/components/Problems";
import { Mounting } from "@/components/Mounting";
import { Objects } from "@/components/Objects";
import { HowWeWork } from "@/components/HowWeWork";
import { Quiz } from "@/components/Quiz";
import { WhyUs } from "@/components/WhyUs";
import { Geography } from "@/components/Geography";
import { InstallationPhotos } from "@/components/InstallationPhotos";
import { FAQ } from "@/components/FAQ";
import { ContactForm } from "@/components/ContactForm";
import { PricesBlock } from "@/components/PricesBlock";
import { business } from "@/data/business";
import { getPricesLeadMain, getPricesSystemTypes } from "@/lib/content-generator";

export default function HomePage() {
  const pricesLead = getPricesLeadMain().split(".").slice(0, 2).join(".").trim() + ".";
  const priceItems = getPricesSystemTypes().slice(0, 3).map((s) => ({
    title: s.title,
    priceLabel: s.priceLabel,
    image: s.image,
  }));
  const localBusiness = getLocalBusinessJsonLd();
  const service = getServiceJsonLd();
  const faq = getFAQPageJsonLd(FAQ_DATA);
  const breadcrumb = getBreadcrumbJsonLd([{ name: "Главная", url: SITE_URL }]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <Hero />
      <Problems />
      <Mounting />
      <Objects />
      <HowWeWork />
      <PricesBlock
        lead={pricesLead}
        pricesHref="/prices"
        linkLabel="Подробнее о ценах"
        items={priceItems}
      />
      <Quiz />
      <WhyUs />
      <Geography />
      <InstallationPhotos id="installations" />
      <FAQ />

      <section id="contacts" className="py-16 md:py-24 bg-slate-50 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            <div>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-6 max-w-sm">
                <Image
                  src={IMAGE_PATHS.contacts}
                  alt="Свяжитесь с нами — Ростов-на-Дону"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Контакты и заявка
              </h2>
              <p className="text-slate-600 mb-6">
                Оставьте заявку — перезвоним в удобное время, ответим на вопросы и согласуем выезд инженера.
              </p>
              <p className="font-semibold text-slate-900">{business.addressText}</p>
              <a
                href={`tel:${business.phoneRaw}`}
                className="text-sky-600 text-lg font-medium hover:underline"
              >
                {business.phone}
              </a>
              <p className="text-slate-500 text-sm mt-2">Пн–Сб: 9:00–19:00</p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
