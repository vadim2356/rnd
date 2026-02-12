"use client";

import { useState } from "react";
import Image from "next/image";
import { IMAGE_PATHS } from "@/lib/image-paths";
import { ContactForm } from "@/components/ContactForm";

const questions: { key: string; label: string; options: string[] }[] = [
  { key: "source", label: "Источник воды", options: ["Скважина", "Колодец", "Центральный водопровод", "Не знаю"] },
  { key: "object", label: "Объект", options: ["Частный дом", "Квартира", "Бизнес"] },
  { key: "hasAnalysis", label: "Есть ли у вас анализ воды?", options: ["Да", "Нет"] },
  { key: "concern", label: "Что беспокоит", options: ["Железо / ржавчина", "Жёсткость / накипь", "Запах", "Мутность", "Питьевая вода"] },
  { key: "points", label: "Точек водоразбора", options: ["1–2", "3–5", "6 и более"] },
  { key: "people", label: "Сколько проживает", options: ["1–2 человека", "3–4 человека", "5 и более"] },
  { key: "space", label: "Место под оборудование", options: ["Да, есть", "Ограничено", "Не знаю"] },
  { key: "kitchen", label: "Нужна питьевая вода на кухне?", options: ["Да", "Нет"] },
  { key: "when", label: "Когда нужен монтаж?", options: ["Срочно", "На этой неделе", "Позже"] },
];

type QuizProps = {
  /** Префикс к комментарию заявки (например, «Интересует: Водоочистка для частного дома»). */
  commentPrefix?: string;
};

export function Quiz({ commentPrefix }: QuizProps = {}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const current = questions[step];
  const isLast = step === questions.length - 1;

  const select = (option: string) => {
    const next = { ...answers, [current.key]: option };
    setAnswers(next);
    if (isLast) {
      setDone(true);
    } else {
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setDone(false);
  };

  if (done) {
    const quizComment =
      "Заявка с квиза. " +
      questions
        .map((q) => `${q.label}: ${answers[q.key] ?? "—"}`)
        .join("; ");
    const formComment = commentPrefix ? `${commentPrefix}. ${quizComment}` : quizComment;

    return (
      <section id="quiz" className="py-16 md:py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 text-center">
              Подберём решение под ваши ответы
            </h2>
            <p className="text-slate-600 mb-8 text-center">
              Оставьте заявку — перезвоним, уточним детали и подготовим расчёт стоимости под вашу задачу.
            </p>
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 mb-6">
              <ContactForm comment={formComment} />
            </div>
            <button
              type="button"
              onClick={reset}
              className="block w-full text-center text-slate-500 text-sm hover:text-slate-700"
            >
              Пройти квиз заново
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="py-16 md:py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] lg:aspect-auto lg:min-h-[320px]">
            <Image
              src={IMAGE_PATHS.quiz}
              alt="Рассчитать стоимость системы очистки воды"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Рассчитать стоимость за 60 секунд
            </h2>
            <p className="text-slate-600 mb-6">
              Ответьте на несколько вопросов — подберём вариант под вашу задачу.
            </p>
            <p className="text-sm text-slate-500 mb-4">
              Вопрос {step + 1} из {questions.length}
            </p>
            <p className="text-lg font-semibold text-slate-900 mb-6">{current.label}</p>
            <ul className="space-y-2">
              {current.options.map((opt) => (
                <li key={opt}>
                  <button
                    type="button"
                    onClick={() => select(opt)}
                    className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 hover:border-sky-400 hover:bg-sky-50/50 transition font-medium text-slate-800"
                  >
                    {opt}
                  </button>
                </li>
              ))}
            </ul>
            {answers.hasAnalysis === "Нет" && step >= 3 && (
              <div className="mt-4 p-4 rounded-lg bg-sky-50 border border-sky-200 text-sky-800 text-sm">
                Рекомендуем оставить заявку: приедем, возьмём пробу воды или подскажем, где сделать анализ. Так подберём оптимальную схему.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
