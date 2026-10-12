"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/types";
import { useShopStore } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const isFavorite = useShopStore((s) => s.favorites.includes(product.id));
  const toggleFavorite = useShopStore((s) => s.toggleFavorite);

  return (
    <article className="group animate-fade-in overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-slate-50 p-4 dark:bg-slate-800">
        <Link href={`/products/${product.id}`} className="flex h-full w-full items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <button
          onClick={() => toggleFavorite(product.id)}
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/90 shadow-sm transition hover:scale-110 dark:bg-slate-900/90"
        >
          <Heart
            className={`size-4 transition ${
              isFavorite ? "fill-rose-500 text-rose-500" : "text-slate-500"
            }`}
          />
        </button>
      </div>

      <div className="p-5">
        <span className="inline-block rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-brand-700 dark:bg-brand-600/20 dark:text-brand-500">
          {product.category}
        </span>

        <Link href={`/products/${product.id}`}>
          <h2 className="mt-2 line-clamp-2 text-sm font-semibold hover:text-brand-600 dark:hover:text-brand-500">
            {product.title}
          </h2>
        </Link>

        <div className="mt-4 flex items-end justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
          <p className="text-lg font-bold">{product.price.toFixed(2)} €</p>
          <p className="text-sm font-medium text-amber-600">
            ⭐ {product.rating.rate.toFixed(1)}
          </p>
        </div>
      </div>
    </article>
  );
}