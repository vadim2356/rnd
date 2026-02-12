import Image from "next/image";

const reviews = [
  {
    name: "Андрей",
    city: "Ростов-на-Дону",
    scenario: "Частный дом, скважина",
    text: "Вода из скважины была с железом и запахом. Подобрали обезжелезиватель и аэрацию. Установили за день, всё работает. Рекомендую.",
    avatar: "/images/avatar.svg",
  },
  {
    name: "Елена",
    city: "Батайск",
    scenario: "Квартира",
    text: "Ставили умягчитель и фильтр под мойку. Монтаж аккуратный, объяснили как менять картриджи. Довольна результатом.",
    avatar: "/images/avatar.svg",
  },
  {
    name: "Дмитрий",
    city: "Аксай",
    scenario: "Дом, колодец",
    text: "Мутная вода и песок — поставили механику и умягчение. Выехали в Аксай без проблем. Цена совпала со сметой.",
    avatar: "/images/avatar.svg",
  },
  {
    name: "Ольга",
    city: "Ростов-на-Дону",
    scenario: "Квартира, питьевая",
    text: "Нужна была только питьевая вода на кухне. Подобрали компактный вариант под мойку. Установили быстро, всё ок.",
    avatar: "/images/avatar.svg",
  },
  {
    name: "Сергей",
    city: "Таганрог",
    scenario: "Частный дом",
    text: "Комплексная система: обезжелезивание, умягчение, питьевой кран. Работают с Таганрогом — приехали, всё смонтировали. Качество на уровне.",
    avatar: "/images/avatar.svg",
  },
  {
    name: "Мария",
    city: "Ростов-на-Дону",
    scenario: "Кофейня",
    text: "Для кофемашин и кухни поставили водоочистку. Подобрали под нагрузку, сервис по замене картриджей договорились. Всё прозрачно.",
    avatar: "/images/avatar.svg",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-slate-50 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">
          Отзывы
        </h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
          Что говорят клиенты после установки систем очистки воды.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <blockquote
              key={r.name + r.city}
              className="flex gap-4 p-6 rounded-xl bg-white border border-slate-200"
            >
              <div className="flex-shrink-0">
                <Image
                  src={r.avatar}
                  alt=""
                  width={56}
                  height={56}
                  className="rounded-full object-cover w-14 h-14"
                />
              </div>
              <div className="min-w-0">
                <p className="text-slate-700 text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                <footer>
                  <p className="font-semibold text-slate-900">{r.name}</p>
                  <p className="text-slate-500 text-sm">{r.city} · {r.scenario}</p>
                </footer>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
