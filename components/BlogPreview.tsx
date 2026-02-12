import Link from "next/link";
import { getBlogArticlesPreview } from "@/data/blog";

export function BlogPreview() {
  const articles = getBlogArticlesPreview(3);

  return (
    <section className="py-12 md:py-16 bg-white border-y border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Статьи о водоочистке
          </h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sky-600 font-medium hover:underline"
          >
            Все статьи
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="block p-5 rounded-xl border-2 border-slate-200 bg-slate-50/50 hover:border-sky-200 hover:bg-sky-50/30 transition"
            >
              <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-slate-600 text-sm line-clamp-3 mb-3">
                {article.description}
              </p>
              <span className="text-sky-600 text-sm font-medium">
                Читать →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
