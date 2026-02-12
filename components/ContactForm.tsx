"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const MIN_SUBMIT_DELAY_MS = 2000;

type ContactFormProps = {
  /** Дополнительный комментарий к заявке (например, интересующая система). */
  comment?: string;
};

export function ContactForm({ comment }: ContactFormProps = {}) {
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

    if (honeypotRef.current?.value) {
      return;
    }

    const name = (formData.get("name") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const contactVia = (formData.get("contactVia") as string)?.trim() || undefined;
    const consent = formData.get("consent");

    if (!name || name.length < 2) {
      setError("Укажите имя (минимум 2 символа).");
      return;
    }
    const phoneDigits = phone?.replace(/\D/g, "") || "";
    if (phoneDigits.length < 10) {
      setError("Укажите номер телефона.");
      return;
    }
    // Российский номер: 10 цифр или 11 (начинается с 7 или 8)
    let normalized: string | null = null;
    if (phoneDigits.length === 10 && /^\d{10}$/.test(phoneDigits)) {
      normalized = "7" + phoneDigits;
    } else if (phoneDigits.length === 11 && phoneDigits.startsWith("7")) {
      normalized = phoneDigits;
    } else if (phoneDigits.length === 11 && phoneDigits.startsWith("8")) {
      normalized = "7" + phoneDigits.slice(1);
    }
    if (!normalized) {
      setError("Укажите корректный российский номер: +7 (XXX) XXX-XX-XX");
      return;
    }
    if (consent !== "on") {
      setError("Необходимо согласие на обработку данных.");
      return;
    }

    if (!mounted) return;
    const mountTime = (window as unknown as { __formMountTime?: number }).__formMountTime ?? Date.now();
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
        body: JSON.stringify({
          name,
          phone: "+" + normalized,
          comment: comment?.trim() || undefined,
          contactVia: contactVia || undefined,
        }),
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
      (window as unknown as { __formMountTime?: number }).__formMountTime = Date.now();
    }
  }, [mounted]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="absolute -left-[9999px] top-0" aria-hidden="true">
        <label htmlFor="website">Не заполняйте</label>
        <input
          ref={honeypotRef}
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
          Имя *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          minLength={2}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-slate-900 placeholder:text-slate-400"
          placeholder="Как к вам обращаться"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
          Телефон *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-slate-900 placeholder:text-slate-400"
          placeholder="+7 (___) ___-__-__"
        />
      </div>

      <div>
        <p className="block text-sm font-medium text-slate-700 mb-2">
          Написать в <span className="text-slate-500 font-normal">(необязательно)</span>
        </p>
        <div className="flex flex-wrap gap-4">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="contactVia"
              value=""
              defaultChecked
              className="rounded-full border-slate-300 text-sky-600 focus:ring-sky-500"
            />
            <span className="text-slate-700">Не важно</span>
          </label>
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="contactVia"
              value="telegram"
              className="rounded-full border-slate-300 text-sky-600 focus:ring-sky-500"
            />
            <span className="text-slate-700">Telegram</span>
          </label>
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="contactVia"
              value="max"
              className="rounded-full border-slate-300 text-sky-600 focus:ring-sky-500"
            />
            <span className="text-slate-700">MAX</span>
          </label>
        </div>
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          required
          className="mt-1 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
        />
        <label htmlFor="consent" className="text-sm text-slate-600">
          Согласен на обработку персональных данных в соответствии с{" "}
          <a href="/privacy" className="text-sky-600 hover:underline">
            политикой конфиденциальности
          </a>
          *
        </label>
      </div>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? "Отправка..." : "Отправить заявку"}
      </button>
    </form>
  );
}
