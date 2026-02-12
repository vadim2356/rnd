import Image from "next/image";
import { IMAGE_PATHS } from "@/lib/image-paths";

export function Hero() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-white pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
              Установка систем очистки воды в Ростове-на-Дону и области — под ключ с гарантией
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-600">
              Подбор по анализу воды. Монтаж за 1 день. Решаем жёсткость, железо, запах/сероводород, мутность. Сервис и обслуживание.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#quiz"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition shadow-lg shadow-sky-600/25"
              >
                Рассчитать стоимость
              </a>
              <a
                href="#contacts"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg border-2 border-sky-500 text-sky-600 font-medium hover:bg-sky-50 transition"
              >
                Вызвать инженера
              </a>
            </div>
            <ul className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4" role="list">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600" aria-hidden>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </span>
                <span className="text-slate-700">Подбор по анализу воды — без переплат</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600" aria-hidden>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </span>
                <span className="text-slate-700">Монтаж за 1 день — без пыли и грязи</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600" aria-hidden>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </span>
                <span className="text-slate-700">Гарантия и сервис — не бросаем после монтажа</span>
              </li>
            </ul>
          </div>
          <div className="relative hidden lg:block rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
            <Image
              src={IMAGE_PATHS.hero}
              alt="Чистая вода из крана — системы очистки воды"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 0px, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
