"use client";

import { useState, type ReactNode } from "react";

export function ExpandablePriceDetails({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-slate-200 pt-5 mt-5">
      <button
        type="button"
        className="w-full text-left flex items-center justify-between gap-2 py-2 font-medium text-slate-900 hover:text-sky-600 transition"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{open ? "Свернуть" : "Подробнее"}</span>
        <span className="text-slate-400 flex-shrink-0" aria-hidden>
          {open ? "−" : "+"}
        </span>
      </button>
      {open && <div className="pt-4 space-y-5">{children}</div>}
    </div>
  );
}
