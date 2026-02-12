import Image from "next/image";
import { IMAGE_PATHS } from "@/lib/image-paths";
import { MountingCalcForm } from "@/components/MountingCalcForm";

const list = [
  { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", label: "Выезд инженера и консультация" },
  { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", label: "Подбор оборудования по анализу воды" },
  { icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4", label: "Доставка оборудования" },
  { icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z", label: "Монтаж и подключение" },
  { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: "Пусконаладка и проверка" },
  { icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", label: "Обучение пользованию" },
  { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Договор и гарантия" },
];

const defaultCity = "Ростове-на-Дону";
const defaultCityAccusative = "Ростову-на-Дону";

type MountingProps = {
  /** Название города в предложном падеже (в Шахтах) — для страниц [citySlug]/[serviceSlug]. */
  cityNamePrepositional?: string;
  /** Комментарий к заявке «Рассчитать стоимость» — город и услуга для лидов. */
  formComment?: string;
};

export function Mounting({ cityNamePrepositional, formComment }: MountingProps = {}) {
  const cityPrepositional = cityNamePrepositional ?? defaultCity;
  const isCityPage = Boolean(cityNamePrepositional);

  return (
    <section id="mounting" className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">
          Монтаж под ключ
        </h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-14">
          От выезда до пусконаладки — одна команда и один день на объекте.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-7xl mx-auto">
          <div className="space-y-8">
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
              <Image
                src={IMAGE_PATHS.mounting}
                alt="Монтаж системы водоочистки под ключ"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-6 text-slate-700 leading-relaxed">
              <p>
                Установка систем очистки воды в {cityPrepositional}{cityPrepositional === "Ростове-на-Дону" ? " и области" : ""} — наша основная специализация. Подбираем схему под ваш источник воды и бюджет, привозим всё необходимое и монтируем за один день. Монтаж водоочистки под ключ включает выезд инженера, подбор по анализу, доставку, установку и пусконаладку.
              </p>
              <p>
                Очистка воды из скважины, колодца или центрального водопровода — в частном доме, квартире или на объекте бизнеса. {isCityPage ? "Работаем в вашем городе и выезжаем в города области." : `Работаем по ${defaultCityAccusative} и выезжаем в города области.`} После сдачи остаёмся на связи: сервис, замена картриджей и консультации по гарантии.
              </p>
            </div>
          </div>
          <div className="lg:sticky lg:top-28">
            <p className="font-semibold text-slate-900 mb-6 text-lg">Что входит в работу</p>
            <ul className="space-y-4" role="list">
              {list.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-sky-200 hover:shadow-md transition"
                >
                  <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </span>
                  <span className="font-medium text-slate-800">{item.label}</span>
                </li>
              ))}
            </ul>
            <MountingCalcForm comment={formComment} />
          </div>
        </div>
      </div>
    </section>
  );
}
