"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ProductCard";
import { LoadingState, ErrorState } from "@/components/StatusState";
import { useShopStore } from "@/lib/store";

export default function HomePage() {
  const products = useShopStore((s) => s.products);
  const status = useShopStore((s) => s.status);
  const error = useShopStore((s) => s.error);
  const fetchProducts = useShopStore((s) => s.fetchProducts);

  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, [products.length, fetchProducts]);

  const featured = products.slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-slate-50 py-16 dark:from-slate-900 dark:to-slate-950 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium dark:border-slate-700 dark:bg-slate-900">
              <Sparkles className="size-3.5 text-brand-600" />
              Projet de portfolio — Next.js + Zustand
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Explorez. Filtrez.{" "}
              <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
                Adorez.
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-slate-600 dark:text-slate-400 sm:text-lg">
              Découvrez des produits en temps réel, sauvegardez vos favoris, et
              naviguez dans une interface pensée pour le plaisir.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-600 px-6 text-sm font-medium text-white transition hover:bg-brand-700"
              >
                Explorer les produits
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-medium transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
              >
                Lire le case study
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-bold sm:text-3xl">Produits phares</h2>
            <Link
              href="/products"
              className="text-sm font-medium text-brand-600 hover:underline dark:text-brand-500"
            >
              Voir tout →
            </Link>
          </div>

          {status === "loading" && <LoadingState />}
          {status === "error" && <ErrorState message={error} onRetry={fetchProducts} />}
          {status === "success" && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}