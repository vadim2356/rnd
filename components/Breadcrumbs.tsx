import Link from "next/link";

export type BreadcrumbItem = { name: string; url: string };

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Хлебные крошки" className="text-sm text-slate-500 mb-6">
      {items.map((item, i) => (
        <span key={item.url}>
          {i > 0 && <span className="mx-2">/</span>}
          {i === items.length - 1 ? (
            <span>{item.name}</span>
          ) : (
            <Link href={item.url} className="hover:text-sky-600 transition">
              {item.name}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
