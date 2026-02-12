"use client";

import { FAQ_DATA, type FAQItem } from "@/lib/seo";
import { FAQAccordion } from "@/components/FAQAccordion";

const DEFAULT_SUBTITLE = "Краткие ответы на типичные вопросы по установке и обслуживанию систем очистки воды.";

type FAQProps = {
  /** Список вопросов и ответов. Если не передан — используется FAQ_DATA с главной. */
  items?: FAQItem[];
  /** Подзаголовок под «Частые вопросы». */
  subtitle?: string;
};

export function FAQ({ items = FAQ_DATA, subtitle = DEFAULT_SUBTITLE }: FAQProps) {
  return (
    <section id="faq" className="py-16 md:py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">
          Частые вопросы
        </h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
          {subtitle}
        </p>
        <div className="max-w-2xl mx-auto">
          <FAQAccordion items={items} />
        </div>
      </div>
    </section>
  );
}
