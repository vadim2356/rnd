/**
 * Пути к изображениям на сайте.
 * Чтобы подставить свои фото вместо заглушек:
 * 1. Положите файлы в public/images/ (или подпапки).
 * 2. Замените значения ниже на пути к вашим файлам, например "/images/hero.webp".
 *
 * Поддерживаемые форматы: jpg, jpeg, png, webp, svg.
 */

export const IMAGE_PATHS = {
  /** Герой на главной и на странице «Услуги» */
  hero: "/images/1.webp",

  /** Блок «Проблемы с водой» на главной */
  problems: "/images/placeholder.svg",

  /** Блок «Монтаж под ключ» на главной */
  mounting: "/images/2.webp",

  /** Блок «Решения по объектам» — 4 карточки (дом, квартира, скважина, бизнес) */
  objects: {
    house: "/images/3.webp",
    apartment: "/images/4.webp",
    well: "/images/5.webp",
    business: "/images/6.webp",
  },

  /** Блок «Рассчитать стоимость» (квиз) на главной */
  quiz: "/images/7.webp",

  /** Блок «Контакты и заявка» на главной */
  contacts: "/images/contact.webp",

  /** Герой на страницах городов (например /rostov-na-donu) */
  cityHero: "/images/placeholder.svg",
} as const;

/**
 * Главное фото для каждой страницы услуги (свой герой у каждого типа услуги).
 * Ключ — slug услуги из data/services (например umyagchenie-vody, obratnyj-osmos).
 * Если для услуги не задано — подставится IMAGE_PATHS.hero.
 */
export const SERVICE_HERO_IMAGES: Record<string, string> = {
  // "ustanovka-sistem-ochistki-vody": "/images/services/ustanovka.webp",
  // "umyagchenie-vody": "/images/services/umyagchenie.webp",
  // "obezzhelezivanie-vody": "/images/services/obezzhelezivanie.webp",
  // "aeraciya-vody": "/images/services/aeraciya.webp",
  // "obratnyj-osmos": "/images/services/osmos.webp",
  // "uf-obezzarazhivanie": "/images/services/uf.webp",
  // "obsluzhivanie": "/images/services/obsluzhivanie.webp",
};

export function getServiceHeroImage(serviceSlug: string): string {
  return SERVICE_HERO_IMAGES[serviceSlug] ?? IMAGE_PATHS.hero;
}
