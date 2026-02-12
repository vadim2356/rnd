"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const SESSION_KEY = "exitIntentShown";
const MIN_SUBMIT_DELAY_MS = 2000;
const COMMENT = "Exit-intent: подарок при покупке (соль или 2 картриджа для грубой очистки)";

export function ExitIntentPopup() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    if (alreadyShown === "1") return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        sessionStorage.setItem(SESSION_KEY, "1");
        setOpen(true);
      }
    };

    document.addEventListener("mouseout", handleMouseLeave);
    return () => document.removeEventListener("mouseout", handleMouseLeave);
  }, [mounted]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (honeypotRef.current?.value) return;

    const name = (formData.get("name") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const contactVia = (formData.get("contactVia") as string)?.trim() || undefined;
    const consent = formData.get("consent");

    if (!name || name.length < 2) {
      setError("Укажите имя (минимум 2 символа).");
      return;
    }
    if (!phone || phone.replace(/\D/g, "").length < 10) {
      setError("Укажите корректный телефон.");
      return;
    }
    if (consent !== "on") {
      setError("Необходимо согласие на обработку данных.");
      return;
    }

    if (!mounted) return;
    const elapsed = Date.now() - (window as unknown as { __exitFormMountTime?: number }).__exitFormMountTime;
    if (elapsed < MIN_SUBMIT_DELAY_MS) {
      setError("Подождите пару секунд и отправьте форму снова.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, comment: COMMENT, contactVia }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Ошибка отправки");
      }
      setOpen(false);
      router.push("/thanks");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка отправки. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mounted && open) {
      (window as unknown as { __exitFormMountTime?: number }).__exitFormMountTime = Date.now();
    }
  }, [mounted, open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
      onClick={(e) => e.target === e.currentTarget && setOpen(false)}
    >
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          aria-label="Закрыть"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6">
          <p id="exit-intent-title" className="text-lg font-semibold text-slate-900 mb-2">
            Подождите! Не уходите без подарка
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            Оставьте заявку сейчас — при покупке системы получите в подарок <strong>соль</strong> или <strong>2 картриджа для грубой очистки воды</strong>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="absolute -left-[9999px] top-0" aria-hidden="true">
            <label htmlFor="exit-website">Не заполняйте</label>
            <input ref={honeypotRef} type="text" id="exit-website" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <div>
            <label htmlFor="exit-name" className="sr-only">Имя</label>
            <input
              type="text"
              id="exit-name"
              name="name"
              required
              minLength={2}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              placeholder="Имя *"
            />
          </div>

          <div>
            <label htmlFor="exit-phone" className="sr-only">Телефон</label>
            <input
              type="tel"
              id="exit-phone"
              name="phone"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              placeholder="Телефон *"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <label className="inline-flex items-center gap-2 cursor-pointer text-sm text-slate-600">
              <input type="radio" name="contactVia" value="telegram" defaultChecked className="rounded-full border-slate-300 text-sky-600 focus:ring-sky-500" />
              Telegram
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer text-sm text-slate-600">
              <input type="radio" name="contactVia" value="max" className="rounded-full border-slate-300 text-sky-600 focus:ring-sky-500" />
              MAX
            </label>
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="exit-consent"
              name="consent"
              required
              className="mt-1 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
            />
            <label htmlFor="exit-consent" className="text-xs text-slate-600">
              Согласен на <a href="/privacy" className="text-sky-600 hover:underline">обработку данных</a> *
            </label>
          </div>

          {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-sky-600 text-white font-semibold hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Отправка..." : "Оставить заявку и получить подарок"}
          </button>
        </form>
      </div>
    </div>
  );
}
