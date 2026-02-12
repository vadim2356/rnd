/**
 * Детерминированный псевдо-рандом по строке (seed) для выбора вариантов шаблонов.
 */
export function hashSeed(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    h = (h << 5) - h + c;
    h = h & h;
  }
  return Math.abs(h);
}

export function pickVariant<T>(variants: T[], seed: number): T {
  return variants[seed % variants.length];
}

export function pickBySlug<T>(variants: T[], slug: string): T {
  return pickVariant(variants, hashSeed(slug));
}

export type ContentVars = {
  cityName: string;
  cityNameGenitive: string;
  regionName: string;
  serviceName: string;
  serviceTitle: string;
  serviceGoal: string;
  brandName: string;
};

export function buildVars(
  cityName: string,
  cityNameGenitive: string,
  serviceName: string,
  serviceTitle: string,
  serviceGoal: string,
  brandName: string,
  regionName: string
): ContentVars {
  return {
    cityName,
    cityNameGenitive,
    regionName,
    serviceName,
    serviceTitle,
    serviceGoal,
    brandName,
  };
}
