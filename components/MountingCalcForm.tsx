"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const MIN_SUBMIT_DELAY_MS = 2000;
const COMMENT = "Рассчитать стоимость (блок Монтаж под ключ)";

export function MountingCalcForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    const mountTime =
  (window as unknown as { __mountingFormMountTime?: number }).__mountingFormMountTime ?? Date.now();

const elapsed = Date.now() - mountTime;

    if (elapsed < MIN_SUBMIT_DELAY_MS) {
      setError("Подождите пару секунд и отправьте форму снова.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, comment, contactVia }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Ошибка отправки");
      }
      router.push("/thanks");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка отправки. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mounted) {
      (window as unknown as { __mountingFormMountTime?: number }).__mountingFormMountTime = Date.now();
    }
  }, [mounted]);

  return (
    <form onSubmit={handleSubmit} className="mt-6 p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
      <p className="font-semibold text-slate-900">Рассчитать стоимость</p>
      <div className="absolute -left-[9999px] top-0" aria-hidden="true">
        <label htmlFor="mounting-website">Не заполняйте</label>
        <input
          ref={honeypotRef}
          type="text"
          id="mounting-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="mounting-name" className="sr-only">Имя</label>
        <input
          type="text"
          id="mounting-name"
          name="name"
          required
          minLength={2}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
          placeholder="Имя *"
        />
      </div>

      <div>
        <label htmlFor="mounting-phone" className="sr-only">Телефон</label>
        <input
          type="tel"
          id="mounting-phone"
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
          id="mounting-consent"
          name="consent"
          required
          className="mt-1 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
        />
        <label htmlFor="mounting-consent" className="text-xs text-slate-600">
          Согласен на{" "}
          <a href="/privacy" className="text-sky-600 hover:underline">обработку данных</a> *
        </label>
      </div>

      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-sky-600 text-white font-semibold hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? "Отправка..." : "Отправить заявку"}
      </button>
    </form>
  );
}
