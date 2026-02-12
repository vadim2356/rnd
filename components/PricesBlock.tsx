"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ContactForm } from "@/components/ContactForm";

export type PricePreviewItem = {
  title: string;
  priceLabel: string;
  /** Путь к фото карточки (например /images/prices/soft-1252.webp) */
  image?: string;
};

type PricesBlockProps = {
  /** Краткий лид (1–2 предложения). */
  lead: string;
  /** Ссылка на страницу цен. */
  pricesHref: string;
  /** Текст кнопки (например: «Подробнее о ценах» или «Цены в Батайске»). */
  linkLabel: string;
  /** Первые 3 тарифа/системы с названием и ценой. */
  items: PricePreviewItem[];
};

export function PricesBlock({ lead, pricesHref, linkLabel, items }: PricesBlockProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PricePreviewItem | null>(null);

  const openRequestForm = (item: PricePreviewItem) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  return (
    <section className="py-12 md:py-16 bg-white border-y border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-3xl mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Цены на установку водоочистки
          </h2>
          <p className="text-slate-600 leading-relaxed">{lead}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {items.map((item, i) => (
            <div
              key={item.title}
              className={`rounded-xl border-2 overflow-hidden transition ${
                i === 1
                  ? "border-sky-200 bg-sky-50/50 shadow-sm"
                  : "border-slate-200 bg-slate-50/50 hover:border-slate-300"
              }`}
            >
              <div
                className="relative w-full aspect-[3/4] bg-slate-100 overflow-hidden"
                aria-hidden
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6a2 2 0 11-4 0 2 2 0 014 0zM16 18h3m-3 4h3"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2 mb-2">
                  {item.title}
                </p>
                <p className="text-lg font-bold text-sky-600 mb-4">{item.priceLabel}</p>
                <button
                  type="button"
                  onClick={() => openRequestForm(item)}
                  className="w-full py-2.5 px-4 rounded-lg border-2 border-sky-600 text-sky-600 font-medium hover:bg-sky-50 transition"
                >
                  Хочу такую
                </button>
              </div>
            </div>
          ))}
        </div>
        <Link
          href={pricesHref}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition shadow-lg shadow-sky-600/20"
        >
          {linkLabel}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Модальное окно с формой заявки */}
      {modalOpen && selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60"
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="request-modal-title"
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <h3 id="request-modal-title" className="text-xl font-bold text-slate-900">
                Заявка: {selectedItem.title}
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
              Оставьте контакты — перезвоним и подготовим расчёт по выбранной системе.
            </p>
            <ContactForm comment={`Интересует: ${selectedItem.title} (${selectedItem.priceLabel})`} />
          </div>
        </div>
      )}
    </section>
  );
}
