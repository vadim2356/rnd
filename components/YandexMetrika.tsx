"use client";

import Script from "next/script";

const YM_ID = 106797821;

export function YandexMetrika() {
  return (
    <Script
      src="https://mc.yandex.ru/metrika/tag.js"
      strategy="afterInteractive"
      onLoad={() => {
        const w = typeof window !== "undefined" ? window : undefined;
        const ym = w && (w as unknown as { ym?: (id: number, action: string, opts?: object) => void }).ym;
        if (ym) {
          ym(YM_ID, "init", {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true,
            ecommerce: "dataLayer",
            referrer: document.referrer,
            url: location.href,
          });
        }
      }}
    />
  );
}
