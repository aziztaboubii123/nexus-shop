"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, Moon, ShoppingBag, Sun, X } from "lucide-react";
import { useState } from "react";
import { useShopStore } from "@/lib/store";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/products", label: "Produits" },
  { href: "/favorites", label: "Favoris" },
  { href: "/about", label: "À propos" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const theme = useShopStore((s) => s.theme);
  const toggleTheme = useShopStore((s) => s.toggleTheme);
  const favorites = useShopStore((s) => s.favorites);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-brand-600 text-white">
            <ShoppingBag className="size-4" />
          </span>
          <span className="font-semibold tracking-tight">Nexus Shop</span>
        </Link>

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

        <div className="flex items-center gap-1">
          <Link
            href="/favorites"
            aria-label={`Favoris (${favorites.length})`}
            className="relative grid size-10 place-items-center rounded-lg transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Heart className="size-5" />
            {favorites.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                {favorites.length}
              </span>
            )}
          </Link>

          <button
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Activer le mode sombre" : "Activer le mode clair"}
            className="grid size-10 place-items-center rounded-lg transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {theme === "light" ? <Moon className="size-5" /> : <Sun className="size-5" />}
          </button>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="grid size-10 place-items-center rounded-lg transition hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-5 py-3 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}