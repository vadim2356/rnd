import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_URL, SITE_NAME, getLocalBusinessJsonLd } from "@/lib/seo";
import { IMAGE_PATHS } from "@/lib/image-paths";
import { business } from "@/data/business";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { LazyMapIframe } from "@/components/LazyMapIframe";

export const metadata: Metadata = {
  title: "Контакты — установка систем очистки воды в Ростове-на-Дону",
  description: `Контакты ${business.brandName}: телефон ${business.phone}, адрес ${business.addressText}. Режим работы: ${business.openingHours}. Заявка на выезд инженера.`,
  alternates: { canonical: `${SITE_URL}/contacts` },
  openGraph: {
    title: "Контакты — установка водоочистки в Ростове-на-Дону",
    description: `Телефон, адрес, режим работы. ${business.brandName}.`,
    url: `${SITE_URL}/contacts`,
  },
};

export default function ContactsPage() {
  const breadcrumbs = [
    { name: "Главная", url: "/" },
    { name: "Контакты", url: "/contacts" },
  ];
  const localBusiness = getLocalBusinessJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <div className="bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-4 sm:py-6">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <section className="relative py-8 sm:py-12 md:py-16 overflow-hidden bg-gradient-to-br from-sky-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight mb-2">
              Контакты
            </h1>
            <p className="text-slate-600 max-w-2xl">
              Свяжитесь с нами для расчёта стоимости, выезда инженера или заказа монтажа систем очистки воды в Ростове-на-Дону и Ростовской области.
            </p>
          </div>
        </section>

        <article className="py-8 md:py-12 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            <div className="space-y-6">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] max-w-md shadow-sm border border-slate-200 bg-white">
                <Image
                  src={IMAGE_PATHS.contacts}
                  alt="Контакты — Ростов-на-Дону"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <section className="space-y-6" aria-label="Контактная информация">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 mb-1">Телефон</h2>
                  <a
                    href={`tel:${business.phoneRaw}`}
                    className="text-sky-600 text-xl font-medium hover:underline"
                  >
                    {business.phone}
                  </a>
                  <p className="text-slate-500 text-sm mt-1">Звонки по России</p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-900 mb-1">Режим работы</h2>
                  <p className="text-slate-700">{business.openingHours}</p>
                </div>

                {business.email && (
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 mb-1">Почта для заявок</h2>
                    <a
                      href={`mailto:${business.email}`}
                      className="text-sky-600 font-medium hover:underline"
                    >
                      {business.email}
                    </a>
                  </div>
                )}

                <div>
                  <h2 className="text-lg font-semibold text-slate-900 mb-1">Адрес</h2>
                  <p className="text-slate-700">{business.addressText}</p>
                </div>

                {business.requisites && (
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 mb-1">Реквизиты</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">{business.requisites}</p>
                  </div>
                )}
              </section>
            </div>

            <div className="space-y-8">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900 mb-2">Оставить заявку</h2>
                <p className="text-slate-600 text-sm mb-6">
                  Оставьте контакты — перезвоним в удобное время, ответим на вопросы и согласуем выезд инженера.
                </p>
                <ContactForm />
              </div>

              {business.mapEmbedUrl && (
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
                  <h2 className="text-lg font-semibold text-slate-900 px-4 py-3 bg-slate-50 border-b border-slate-200">
                    Как нас найти
                  </h2>
                  <div className="relative w-full aspect-[4/3] min-h-[200px] bg-slate-100">
                    <LazyMapIframe
                      src={business.mapEmbedUrl}
                      title="Карта — Ростов-на-Дону"
                      className="absolute inset-0 border-0"
                      containerClassName="absolute inset-0"
                      minHeight="200px"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <p className="mt-10">
            <Link href="/" className="text-sky-600 font-medium hover:underline">
              ← На главную
            </Link>
          </p>
          </div>
        </article>
      </div>
    </>
  );
}
