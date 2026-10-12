"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/products", label: "Produits" },
  { href: "/favorites", label: "Favoris" },
  { href: "/about", label: "À propos" },
];

export function NavLinks() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="hidden items-center gap-1 md:flex">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={`rounded-full px-3 py-2 text-sm font-medium transition ${
            isActive(l.href)
              ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          }`}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}