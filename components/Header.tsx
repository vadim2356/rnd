"use client";

import Link from "next/link";
import { useState } from "react";
import { business } from "@/data/business";

const navItems = [
  { label: "Проблемы воды", href: "#problems" },
  { label: "Монтаж под ключ", href: "#mounting" },
  { label: "Решения", href: "#objects" },
  { label: "Как работаем", href: "#how" },
  { label: "Калькулятор", href: "#quiz" },
  { label: "Фото с монтажей", href: "#installations" },
  { label: "Блог", href: "/blog" },
  { label: "Контакты", href: "#contacts" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between h-16 md:h-18">
        <Link href="/" className="text-lg font-semibold text-slate-800 shrink-0">
          {business.brandName}
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) =>
            item.href.startsWith("/") ? (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-600 hover:text-sky-600 text-sm transition"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="text-slate-600 hover:text-sky-600 text-sm transition"
              >
                {item.label}
              </a>
            )
          )}
        </nav>
        <a
          href={`tel:${business.phoneRaw}`}
          className="hidden md:inline text-sky-600 font-medium text-sm whitespace-nowrap"
        >
          {business.phone}
        </a>
        <button
          type="button"
          aria-label="Меню"
          className="md:hidden p-2 text-slate-600"
          onClick={() => setOpen(!open)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <nav className="md:hidden border-t border-slate-200 bg-white py-4 px-4 flex flex-col gap-2">
          {navItems.map((item) =>
            item.href.startsWith("/") ? (
              <Link
                key={item.href}
                href={item.href}
                className="py-2 text-slate-600 hover:text-sky-600"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="py-2 text-slate-600 hover:text-sky-600"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            )
          )}
          <a href={`tel:${business.phoneRaw}`} className="py-2 text-sky-600 font-medium">
            {business.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
