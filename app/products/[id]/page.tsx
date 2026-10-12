"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Heart, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LoadingState, ErrorState } from "@/components/StatusState";
import { useShopStore } from "@/lib/store";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const products = useShopStore((s) => s.products);
  const status = useShopStore((s) => s.status);
  const fetchProducts = useShopStore((s) => s.fetchProducts);
  const isFavorite = useShopStore((s) => s.favorites.includes(Number(id)));
  const toggleFavorite = useShopStore((s) => s.toggleFavorite);

  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, [products.length, fetchProducts]);

  if (status === "loading" || status === "idle") {
    return (
      <Container className="py-10">
        <LoadingState />
      </Container>
    );
  }

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-2xl font-bold">Produit introuvable</h1>
        <button
          onClick={() => router.push("/products")}
          className="mt-4 text-brand-600 hover:underline"
        >
          Retour aux produits
        </button>
      </Container>
    );
  }

  return (
    <Container className="animate-fade-in py-10 sm:py-16">
      <Link
        href="/products"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
      >
        <ArrowLeft className="size-4" />
        Retour
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex items-center justify-center rounded-2xl bg-white p-8 dark:bg-slate-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.title}
            className="max-h-96 w-full object-contain"
          />
        </div>

        <div>
          <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-brand-700 dark:bg-brand-600/20 dark:text-brand-500">
            {product.category}
          </span>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{product.title}</h1>

          <div className="mt-3 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Star className="size-4 fill-amber-500 text-amber-500" />
            <span>{product.rating.rate.toFixed(1)} / 5</span>
          </div>

          <p className="mt-6 text-slate-700 dark:text-slate-300">{product.description}</p>

          <p className="mt-8 text-4xl font-bold">{product.price.toFixed(2)} €</p>

          <button
            onClick={() => toggleFavorite(product.id)}
            className={`mt-6 inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-medium transition ${
              isFavorite
                ? "bg-rose-600 text-white hover:bg-rose-700"
                : "bg-brand-600 text-white hover:bg-brand-700"
            }`}
          >
            <Heart className={`size-4 ${isFavorite ? "fill-white" : ""}`} />
            {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          </button>
        </div>
      </div>
    </Container>
  );
}