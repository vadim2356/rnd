const steps = [
  { num: "1", title: "Заявка или звонок", text: "Оставляете заявку на сайте или звоните. Уточняем источник воды и задачу." },
  { num: "2", title: "Выезд инженера", text: "Приезжаем на объект, смотрим разводку и место под оборудование. При необходимости берём пробу на анализ." },
  { num: "3", title: "Подбор и расчёт", text: "Рассчитываем схему водоочистки под ваш анализ и бюджет. Направляем КП с оборудованием и монтажом." },
  { num: "4", title: "Договор и доставка", text: "Заключаем договор, согласуем дату. Привозим оборудование и материалы на объект." },
  { num: "5", title: "Монтаж за 1 день", text: "Устанавливаем систему, подключаем, настраиваем. Показываем, как пользоваться и обслуживать." },
  { num: "6", title: "Гарантия и сервис", text: "Передаём документы и гарантию. Остаёмся на связи: сервис, замена картриджей, консультации." },
];

const topSteps = steps.slice(0, 3);
const bottomSteps = steps.slice(3, 6);

function ArrowRight() {
  return (
    <div className="hidden sm:flex flex-shrink-0 items-center justify-center w-6 md:w-8 text-sky-300" aria-hidden>
      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </div>
  );
}

function StepCard({ step }: { step: (typeof steps)[0] }) {
  return (
    <div className="flex gap-4 p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-sky-200 transition flex-1 min-w-0">
      <span className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-sky-600 text-white font-semibold flex items-center justify-center text-sm">
        {step.num}
      </span>
      <div className="min-w-0">
        <h3 className="font-semibold text-slate-900 text-sm sm:text-base">{step.title}</h3>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">{step.text}</p>
      </div>
    </div>
  );
}

function StepRow({ rowSteps }: { rowSteps: typeof steps }) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch gap-4 sm:gap-0">
      {rowSteps.map((step, i) => (
        <span key={step.num} className="flex items-stretch sm:flex-1">
          <StepCard step={step} />
          {i < rowSteps.length - 1 && <ArrowRight />}
        </span>
      ))}
    </div>
  );
}

export function HowWeWork() {
  return (
    <section id="how" className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">
          Как мы работаем
        </h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          От заявки до пуска системы — прозрачно и без лишних визитов.
        </p>
        <div className="space-y-6 sm:space-y-8">
          <StepRow rowSteps={topSteps} />
          <StepRow rowSteps={bottomSteps} />
        </div>
      </div>
    </section>
  );
}
