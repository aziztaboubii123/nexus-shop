"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ProductCard";
import { useShopStore } from "@/lib/store";

export default function FavoritesPage() {
  const products = useShopStore((s) => s.products);
  const favorites = useShopStore((s) => s.favorites);
  const fetchProducts = useShopStore((s) => s.fetchProducts);

  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, [products.length, fetchProducts]);

  const favProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <Container className="py-10 sm:py-16">
      <header className="mb-8">
        <h1 className="flex items-center gap-3 text-3xl font-bold sm:text-4xl">
          <Heart className="size-8 fill-rose-500 text-rose-500" />
          Mes favoris
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          {favProducts.length} produit{favProducts.length > 1 ? "s" : ""} sauvegardé
          {favProducts.length > 1 ? "s" : ""}
        </p>
      </header>

      {favProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center dark:border-slate-700 dark:bg-slate-900">
          <Heart className="mx-auto size-12 text-slate-300" />
          <h2 className="mt-4 text-lg font-semibold">Aucun favori pour l'instant</h2>
          <p className="mt-2 text-sm text-slate-500">
            Cliquez sur le cœur d'un produit pour l'ajouter ici.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-brand-600 px-6 text-sm font-medium text-white transition hover:bg-brand-700"
          >
            Explorer les produits
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </Container>
  );
}