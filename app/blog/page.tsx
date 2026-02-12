import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";
import { BLOG_ARTICLES } from "@/data/blog";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Блог — статьи о водоочистке в Ростове-на-Дону",
  description:
    "Статьи о системах очистки воды: типы систем, анализ воды, борьба с накипью. Ростов-на-Дону и Ростовская область. Дукат Снаб.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogPage() {
  const breadcrumbs = [
    { name: "Главная", url: "/" },
    { name: "Блог", url: "/blog" },
  ];

  return (
    <article className="py-8 md:py-12 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-2xl md:text-4xl font-bold text-slate-900 mb-2">
          Блог
        </h1>
        <p className="text-slate-600 mb-10 max-w-2xl">
          Полезные статьи о водоочистке, анализе воды и выборе систем для дома и квартиры в Ростове-на-Дону и области.
        </p>
        <ul className="space-y-6">
          {BLOG_ARTICLES.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/blog/${article.slug}`}
                className="block p-6 rounded-xl border-2 border-slate-200 bg-white hover:border-sky-200 hover:shadow-md transition"
              >
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                  {article.title}
                </h2>
                <p className="text-slate-600 text-sm mb-3">
                  {article.description}
                </p>
                <time
                  dateTime={article.date}
                  className="text-slate-500 text-sm"
                >
                  {new Date(article.date).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <span className="ml-2 text-sky-600 text-sm font-medium">
                  Читать →
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10">
          <Link href="/" className="text-sky-600 font-medium hover:underline">
            ← На главную
          </Link>
        </p>
      </div>
    </article>
  );
}
