"use client";

import { useState } from "react";
import { business } from "@/data/business";

export function FloatingCTA() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 md:bottom-6 md:right-6">
      {open && (
        <div className="flex flex-col gap-2 rounded-xl bg-white border border-slate-200 shadow-xl p-2 animate-[fadeIn_0.2s_ease-out]">
          <a
            href={`tel:${business.phoneRaw}`}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 transition text-slate-800 font-medium"
          >
            <span className="flex w-10 h-10 rounded-full bg-green-100 text-green-600 items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </span>
            Позвонить
          </a>
          <a
            href="#contacts"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 transition text-slate-800 font-medium"
          >
            <span className="flex w-10 h-10 rounded-full bg-sky-100 text-sky-600 items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            Написать
          </a>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Закрыть меню" : "Позвонить или написать"}
        className="flex w-14 h-14 md:w-16 md:h-16 rounded-full bg-sky-600 text-white shadow-lg shadow-sky-600/30 hover:bg-sky-700 transition items-center justify-center"
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        )}
      </button>
    </div>
  );
}
