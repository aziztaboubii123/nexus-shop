"use client";

import { useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ProductCard";
import { LoadingState, ErrorState, EmptyState } from "@/components/StatusState";
import { useShopStore } from "@/lib/store";

export default function ProductsPage() {
  const products = useShopStore((s) => s.products);
  const status = useShopStore((s) => s.status);
  const error = useShopStore((s) => s.error);
  const query = useShopStore((s) => s.query);
  const category = useShopStore((s) => s.category);
  const fetchProducts = useShopStore((s) => s.fetchProducts);
  const setQuery = useShopStore((s) => s.setQuery);
  const setCategory = useShopStore((s) => s.setCategory);

  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, [products.length, fetchProducts]);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(set).sort()];
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) =>
        (q === "" || p.title.toLowerCase().includes(q)) &&
        (category === "all" || p.category === category)
    );
  }, [products, query, category]);

  return (
    <Container className="py-10 sm:py-16">
      <header className="mb-8">
        <h1 className="text-3xl font-bold sm:text-4xl">Tous les produits</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Recherchez, filtrez, et cliquez pour voir les détails.
        </p>
      </header>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un produit..."
            aria-label="Rechercher"
            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={status !== "success"}
          aria-label="Filtrer par catégorie"
          className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === "all" ? "Toutes les catégories" : c}
            </option>
          ))}
        </select>
      </div>

      {status === "loading" && <LoadingState />}
      {status === "error" && <ErrorState message={error} onRetry={fetchProducts} />}
      {status === "success" && filtered.length === 0 && <EmptyState query={query} />}
      {status === "success" && filtered.length > 0 && (
        <>
          <p className="mb-4 text-sm text-slate-500">
            {filtered.length} produit{filtered.length > 1 ? "s" : ""} affiché
            {filtered.length > 1 ? "s" : ""}
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </Container>
  );
}