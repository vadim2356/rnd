"use client";

import { useState } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div
          key={i}
          className="border border-slate-200 rounded-lg overflow-hidden"
        >
          <button
            type="button"
            className="w-full text-left px-4 py-4 flex items-center justify-between gap-4 font-medium text-slate-900 hover:bg-slate-50 transition"
            onClick={() => setOpenId(openId === i ? null : i)}
            aria-expanded={openId === i}
          >
            {item.question}
            <span className="flex-shrink-0 text-slate-400">
              {openId === i ? "−" : "+"}
            </span>
          </button>
          {openId === i && (
            <div className="px-4 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-2">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
