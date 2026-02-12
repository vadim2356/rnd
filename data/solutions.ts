export const SOLUTION_SLUGS = [
  "dlya-chastnogo-doma",
  "dlya-kvartiry",
  "iz-skvazhiny",
  "dlya-biznesa-horeca",
] as const;

export type SolutionSlug = (typeof SOLUTION_SLUGS)[number];

export interface SolutionConfig {
  slug: SolutionSlug;
  title: string;
  titleShort: string;
  metaTitle: string;
  description: string;
  objects: string[];
  sources: string[];
}

export const solutions: Record<SolutionSlug, SolutionConfig> = {
  "dlya-chastnogo-doma": {
    slug: "dlya-chastnogo-doma",
    title: "Водоочистка для частного дома",
    titleShort: "для частного дома",
    metaTitle: "Водоочистка для частного дома",
    description:
      "Комплексные системы очистки воды для частных домов: скважина, колодец, несколько санузлов, отопление. Подбор под анализ воды, монтаж под ключ.",
    objects: ["частный дом", "коттедж", "дача с водопроводом"],
    sources: ["скважина", "колодец", "центральный водопровод"],
  },
  "dlya-kvartiry": {
    slug: "dlya-kvartiry",
    title: "Водоочистка для квартиры",
    titleShort: "для квартиры",
    metaTitle: "Водоочистка для квартиры",
    description:
      "Умягчение и очистка воды в квартире: умягчители, фильтры под мойку, обратный осмос. Компактные решения под центральный водопровод.",
    objects: ["квартира", "таунхаус"],
    sources: ["центральный водопровод"],
  },
  "iz-skvazhiny": {
    slug: "iz-skvazhiny",
    title: "Очистка воды из скважины",
    titleShort: "из скважины",
    metaTitle: "Очистка воды из скважины",
    description:
      "Обезжелезивание, умягчение, аэрация, УФ — подбор схемы по анализу воды из скважины. Монтаж под ключ с гарантией.",
    objects: ["дом со скважиной", "участок со скважиной"],
    sources: ["скважина"],
  },
  "dlya-biznesa-horeca": {
    slug: "dlya-biznesa-horeca",
    title: "Водоочистка для бизнеса и HoReCa",
    titleShort: "для бизнеса и HoReCa",
    metaTitle: "Водоочистка для бизнеса и HoReCa",
    description:
      "Водоочистка для кафе, ресторанов, отелей, кофеен: кухня, кофемашины, льдогенераторы. Подбор под нагрузку и сервис.",
    objects: ["кафе", "ресторан", "отель", "кофейня", "бар"],
    sources: ["центральный водопровод", "скважина"],
  },
};

export function getSolutionBySlug(slug: string): SolutionConfig | null {
  return (SOLUTION_SLUGS as readonly string[]).includes(slug) ? solutions[slug as SolutionSlug] : null;
}
