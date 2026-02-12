"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IMAGE_PATHS } from "@/lib/image-paths";
import { ContactForm } from "@/components/ContactForm";

const objects = [
  {
    title: "Частный дом",
    description: "Скважина или колодец, несколько санузлов, отопление. Комплексная водоочистка и при необходимости питьевая система под мойку.",
    cta: "Подобрать для дома",
    ctaForm: "Оставить заявку",
    href: "/solutions/dlya-chastnogo-doma",
    image: IMAGE_PATHS.objects.house,
    alt: "Частный дом — водоочистка под ключ",
  },
  {
    title: "Квартира",
    description: "Центральный водопровод: умягчение, удаление хлора, питьевой фильтр под мойку. Компактные решения без лишних затрат.",
    cta: "Подобрать для квартиры",
    ctaForm: "Оставить заявку",
    href: "/solutions/dlya-kvartiry",
    image: IMAGE_PATHS.objects.apartment,
    alt: "Квартира — фильтр под мойку",
  },
  {
    title: "Скважина",
    description: "Обезжелезивание, умягчение, удаление запаха и мутности. Подбор по анализу воды из вашей скважины.",
    cta: "Анализ и подбор",
    ctaForm: "Оставить заявку",
    href: "/solutions/iz-skvazhiny",
    image: IMAGE_PATHS.objects.well,
    alt: "Скважина — очистка воды",
  },
  {
    title: "Бизнес и HoReCa",
    description: "Кафе, рестораны, отели, кофейни. Водоочистка для кухни, кофемашин, льдогенераторов и гостиничных номеров.",
    cta: "Решение для бизнеса",
    ctaForm: "Оставить заявку",
    href: "/solutions/dlya-biznesa-horeca",
    image: IMAGE_PATHS.objects.business,
    alt: "Бизнес — водоочистка для HoReCa",
  },
];

export function Objects() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<typeof objects[0] | null>(null);

  const openForm = (e: React.MouseEvent, obj: typeof objects[0]) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedCard(obj);
    setModalOpen(true);
  };

  return (
    <section id="objects" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">
          Решения по объектам
        </h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
          Частные дома, квартиры, скважины и коммерческие объекты — подбираем схему под вашу задачу.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {objects.map((obj) => (
            <article
              key={obj.href}
              className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-sky-200 transition"
            >
              <Link href={obj.href} className="block">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={obj.image}
                    alt={obj.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{obj.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{obj.description}</p>
                  <span className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-sky-600 text-white text-sm font-medium group-hover:bg-sky-700 transition">
                    {obj.cta}
                  </span>
                </div>
              </Link>
              <div className="px-6 md:px-8 pb-6 md:pb-8 -mt-2">
                <button
                  type="button"
                  onClick={(e) => openForm(e, obj)}
                  className="w-full py-2.5 px-4 rounded-lg border-2 border-sky-600 text-sky-600 font-medium hover:bg-sky-50 transition text-sm"
                >
                  {obj.ctaForm}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {modalOpen && selectedCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60"
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="objects-modal-title"
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <h3 id="objects-modal-title" className="text-xl font-bold text-slate-900">
                Заявка: {selectedCard.title}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex-shrink-0 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                aria-label="Закрыть"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-slate-600 text-sm mb-6">
              Оставьте контакты — перезвоним и подберём решение под вашу задачу.
            </p>
            <ContactForm comment={`Интересует: ${selectedCard.title}`} />
          </div>
        </div>
      )}
    </section>
  );
}
