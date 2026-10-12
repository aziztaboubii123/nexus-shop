"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { Heart, Menu, Moon, ShoppingBag, Sun, X } from "lucide-react";
import { useShopStore } from "@/lib/store";
import { NavLinks } from "./navLinks";

const mobileLinks = [
  { href: "/", label: "Accueil" },
  { href: "/products", label: "Produits" },
  { href: "/favorites", label: "Favoris" },
  { href: "/about", label: "À propos" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const theme = useShopStore((s) => s.theme);
  const toggleTheme = useShopStore((s) => s.toggleTheme);
  const favorites = useShopStore((s) => s.favorites);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-brand-600 text-white">
            <ShoppingBag className="size-4" />
          </span>
          <span className="font-semibold tracking-tight">Nexus Shop</span>
        </Link>

        <Suspense fallback={<div className="hidden h-10 w-64 md:block" />}>
          <NavLinks />
        </Suspense>

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
          {mobileLinks.map((l) => (
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