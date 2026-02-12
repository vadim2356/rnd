import Link from "next/link";

export type SeeAlsoLink = { label: string; href: string };

interface SeeAlsoProps {
  title: string;
  links: SeeAlsoLink[];
}

export function SeeAlso({ title, links }: SeeAlsoProps) {
  if (links.length === 0) return null;
  return (
    <section className="mt-10 pt-8 border-t border-slate-200">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">{title}</h2>
      <ul className="flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-block px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-sm hover:border-sky-400 hover:text-sky-600 transition"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
