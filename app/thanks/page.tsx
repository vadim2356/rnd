import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Заявка отправлена",
  description: "Спасибо за заявку. Мы свяжемся с вами в ближайшее время.",
  alternates: { canonical: `${SITE_URL}/thanks` },
  robots: { index: false, follow: true },
};

export default function ThanksPage() {
  return (
    <article className="py-16 md:py-24 min-h-[60vh] flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-lg mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6" aria-hidden>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          Спасибо за заявку
        </h1>
        <p className="text-slate-600 mb-8">
          Мы получили ваши контакты и перезвоним в ближайшее время в рабочее время (Пн–Сб, 9:00–19:00). Если вопрос срочный — звоните по номеру +7 (863) 123-45-67.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition"
        >
          Вернуться на главную
        </Link>
        </div>
      </div>
    </article>
  );
}
