export const CITY_SLUGS = [
  "rostov-na-donu",
  "bataysk",
  "aksay",
  "azov",
  "taganrog",
  "novocherkassk",
  "shahty",
  "novoshakhtinsk",
  "kamensk-shakhtinskiy",
  "volgodonsk",
] as const;

export type CitySlug = (typeof CITY_SLUGS)[number];

export interface CityConfig {
  slug: CitySlug;
  name: string;
  nameGenitive: string;
  /** Предложный падеж: в Ростове-на-Дону, в Батайске */
  namePrepositional: string;
  region: string;
}

export const cities: Record<CitySlug, CityConfig> = {
  "rostov-na-donu": {
    slug: "rostov-na-donu",
    name: "Ростов-на-Дону",
    nameGenitive: "Ростова-на-Дону",
    namePrepositional: "Ростове-на-Дону",
    region: "Ростовская область",
  },
  bataysk: {
    slug: "bataysk",
    name: "Батайск",
    nameGenitive: "Батайска",
    namePrepositional: "Батайске",
    region: "Ростовская область",
  },
  aksay: {
    slug: "aksay",
    name: "Аксай",
    nameGenitive: "Аксая",
    namePrepositional: "Аксае",
    region: "Ростовская область",
  },
  azov: {
    slug: "azov",
    name: "Азов",
    nameGenitive: "Азова",
    namePrepositional: "Азове",
    region: "Ростовская область",
  },
  taganrog: {
    slug: "taganrog",
    name: "Таганрог",
    nameGenitive: "Таганрога",
    namePrepositional: "Таганроге",
    region: "Ростовская область",
  },
  novocherkassk: {
    slug: "novocherkassk",
    name: "Новочеркасск",
    nameGenitive: "Новочеркасска",
    namePrepositional: "Новочеркасске",
    region: "Ростовская область",
  },
  shahty: {
    slug: "shahty",
    name: "Шахты",
    nameGenitive: "Шахт",
    namePrepositional: "Шахтах",
    region: "Ростовская область",
  },
  novoshakhtinsk: {
    slug: "novoshakhtinsk",
    name: "Новошахтинск",
    nameGenitive: "Новошахтинска",
    namePrepositional: "Новошахтинске",
    region: "Ростовская область",
  },
  "kamensk-shakhtinskiy": {
    slug: "kamensk-shakhtinskiy",
    name: "Каменск-Шахтинский",
    nameGenitive: "Каменска-Шахтинского",
    namePrepositional: "Каменске-Шахтинском",
    region: "Ростовская область",
  },
  volgodonsk: {
    slug: "volgodonsk",
    name: "Волгодонск",
    nameGenitive: "Волгодонска",
    namePrepositional: "Волгодонске",
    region: "Ростовская область",
  },
};

export const RESERVED_SLUGS = ["privacy", "thanks", "services", "solutions", "sitemap", "api", "goroda", "prices"] as const;

export function isCitySlug(slug: string): slug is CitySlug {
  return (CITY_SLUGS as readonly string[]).includes(slug);
}

export function getCityBySlug(slug: string): CityConfig | null {
  return isCitySlug(slug) ? cities[slug] : null;
}
