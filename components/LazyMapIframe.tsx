"use client";

import { useEffect, useRef, useState } from "react";

type LazyMapIframeProps = {
  src: string;
  title: string;
  className?: string;
  containerClassName?: string;
  minHeight?: string;
};

/**
 * Карта загружается только когда блок попадает в viewport — снижает блокировку отрисовки и объём стороннего JS (Yandex Maps) при первой загрузке.
 */
export function LazyMapIframe({
  src,
  title,
  className = "w-full h-full min-h-[280px]",
  containerClassName = "",
  minHeight = "280px",
}: LazyMapIframeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "100px", threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${containerClassName}`.trim()}
      style={{ minHeight }}
    >
      {shouldLoad ? (
        <iframe
          title={title}
          src={src}
          width="100%"
          height="100%"
          frameBorder={0}
          allowFullScreen
          className={className}
          style={{ border: 0 }}
          loading="lazy"
        />
      ) : (
        <div
          className="w-full h-full bg-slate-200 animate-pulse rounded-lg flex items-center justify-center text-slate-500 text-sm"
          style={{ minHeight }}
          aria-hidden
        >
          Загрузка карты…
        </div>
      )}
    </div>
  );
}
