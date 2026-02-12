import Image from "next/image";
import { INSTALLATION_PHOTOS } from "@/lib/installation-photos";

type InstallationPhotosProps = {
  /** id секции для якоря в меню (главная страница) */
  id?: string;
  /** Компактный вид внутри карточки (страницы услуг) */
  embedded?: boolean;
};

export function InstallationPhotos({ id = "installations", embedded = false }: InstallationPhotosProps) {
  if (INSTALLATION_PHOTOS.length === 0) {
    if (embedded) {
      return (
        <section className="mt-10">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-semibold text-slate-900">Фото с монтажей</h2>
            </div>
            <div className="p-6">
              <p className="text-slate-500 text-sm">
                Добавьте пути к фото в <code className="bg-slate-100 px-1 rounded">lib/installation-photos.ts</code> и положите файлы в <code className="bg-slate-100 px-1 rounded">public/images/installations/</code>.
              </p>
            </div>
          </div>
        </section>
      );
    }
    return (
      <section id={id} className="py-16 md:py-24 bg-slate-50 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">
            Фото с монтажей
          </h2>
          <p className="text-slate-600 text-center max-w-2xl mx-auto">
            Добавьте пути к фото в <code className="bg-slate-100 px-1 rounded text-sm">lib/installation-photos.ts</code> и положите файлы в <code className="bg-slate-100 px-1 rounded text-sm">public/images/installations/</code>.
          </p>
        </div>
      </section>
    );
  }

  const content = (
    <>
      <h2 className={`font-semibold text-slate-900 ${embedded ? "text-xl" : "text-2xl md:text-3xl"}`}>
        Фото с монтажей
      </h2>
      {!embedded && (
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10">
          Наши работы: установка систем очистки воды под ключ.
        </p>
      )}
      <div className={`grid gap-4 ${embedded ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"}`}>
        {INSTALLATION_PHOTOS.map((src, i) => (
          <div
            key={src + i}
            className={`relative aspect-square rounded-xl overflow-hidden bg-slate-100 ${embedded ? "" : "shadow-md"}`}
          >
            <Image
              src={src}
              alt={`Монтаж ${i + 1}`}
              fill
              className="object-cover"
              sizes={embedded ? "(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw" : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"}
            />
          </div>
        ))}
      </div>
    </>
  );

  if (embedded) {
    return (
      <section className="mt-10">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-xl font-semibold text-slate-900">Фото с монтажей</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {INSTALLATION_PHOTOS.map((src, i) => (
                <div
                  key={src + i}
                  className="relative aspect-square rounded-xl overflow-hidden bg-slate-100"
                >
                  <Image
                    src={src}
                    alt={`Монтаж ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="py-16 md:py-24 bg-slate-50 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Фото с монтажей
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Наши работы: установка систем очистки воды под ключ.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {INSTALLATION_PHOTOS.map((src, i) => (
            <div
              key={src + i}
              className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 shadow-md"
            >
              <Image
                src={src}
                alt={`Монтаж ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
