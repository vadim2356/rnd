/**
 * Пути к изображениям на сайте.
 * Чтобы подставить свои фото вместо заглушек:
 * 1. Положите файлы в public/images/ (или подпапки).
 * 2. Замените значения ниже на пути к вашим файлам, например "/images/hero.jpg".
 *
 * Поддерживаемые форматы: jpg, jpeg, png, webp, svg.
 */

export const IMAGE_PATHS = {
  /** Герой на главной и на странице «Услуги» */
  hero: "/images/1.png",

  /** Блок «Проблемы с водой» на главной */
  problems: "/images/placeholder.svg",

  /** Блок «Монтаж под ключ» на главной */
  mounting: "/images/2.png",

  /** Блок «Решения по объектам» — 4 карточки (дом, квартира, скважина, бизнес) */
  objects: {
    house: "/images/3.png",
    apartment: "/images/4.png",
    well: "/images/5.png",
    business: "/images/6.png",
  },

  /** Блок «Рассчитать стоимость» (квиз) на главной */
  quiz: "/images/7.png",

  /** Блок контактов на главной */
  contacts: "/images/placeholder.svg",

  /** Герой на страницах городов (например /rostov-na-donu) */
  cityHero: "/images/placeholder.svg",
} as const;

/**
 * Главное фото для каждой страницы услуги (свой герой у каждого типа услуги).
 * Ключ — slug услуги из data/services (например umyagchenie-vody, obratnyj-osmos).
 * Если для услуги не задано — подставится IMAGE_PATHS.hero.
 */
export const SERVICE_HERO_IMAGES: Record<string, string> = {
  // "ustanovka-sistem-ochistki-vody": "/images/services/ustanovka.jpg",
  // "umyagchenie-vody": "/images/services/umyagchenie.jpg",
  // "obezzhelezivanie-vody": "/images/services/obezzhelezivanie.jpg",
  // "aeraciya-vody": "/images/services/aeraciya.jpg",
  // "obratnyj-osmos": "/images/services/osmos.jpg",
  // "uf-obezzarazhivanie": "/images/services/uf.jpg",
  // "obsluzhivanie": "/images/services/obsluzhivanie.jpg",
};

export function getServiceHeroImage(serviceSlug: string): string {
  return SERVICE_HERO_IMAGES[serviceSlug] ?? IMAGE_PATHS.hero;
}
