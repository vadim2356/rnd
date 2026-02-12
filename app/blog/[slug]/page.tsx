import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/seo";
import { BLOG_SLUGS, getBlogArticle } from "@/data/blog";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export async function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) return { title: "Статья не найдена" };
  const title = `${article.title} — блог`;
  const description =
    article.description.length > 160
      ? article.description.slice(0, 157) + "…"
      : article.description;
  const path = `/blog/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: { title, description, url: `${SITE_URL}${path}` },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) notFound();

  const breadcrumbs = [
    { name: "Главная", url: "/" },
    { name: "Блог", url: "/blog" },
    { name: article.title, url: `/blog/${slug}` },
  ];

  return (
    <article className="py-8 md:py-12 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <Breadcrumbs items={breadcrumbs} />
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            {article.title}
          </h1>
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
        </header>

        {article.toc.length > 0 && (
          <nav
            className="mb-8 p-4 rounded-xl bg-white border border-slate-200 shadow-sm"
            aria-label="Оглавление статьи"
          >
            <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
              Содержание
            </h2>
            <ul className="space-y-1.5">
              {article.toc.map((item) => (
                <li
                  key={item.id}
                  className={item.level === 3 ? "pl-4 border-l-2 border-slate-200" : undefined}
                >
                  <a
                    href={`#${item.id}`}
                    className="text-sky-600 hover:text-sky-700 hover:underline text-sm leading-snug"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div
          className="max-w-none text-slate-800 [&_p]:text-slate-700 [&_p]:leading-relaxed [&_h2]:font-semibold [&_h2]:text-slate-900 [&_h2]:scroll-mt-24 [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:font-semibold [&_h3]:text-slate-900 [&_h3]:scroll-mt-24 [&_h3]:mt-6 [&_h3]:mb-2 [&_strong]:text-slate-900"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        <p className="mt-10">
          <Link href="/blog" className="text-sky-600 font-medium hover:underline">
            ← Все статьи
          </Link>
        </p>
      </div>
    </article>
  );
}
