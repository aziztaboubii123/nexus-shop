import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Product } from "./types";

type Status = "idle" | "loading" | "success" | "error";
type Theme = "light" | "dark";

type ShopState = {
  // Products
  products: Product[];
  status: Status;
  error: string | null;

  // Filtres
  query: string;
  category: string;

  // Favoris
  favorites: number[];

  // Thème
  theme: Theme;

  // Actions
  fetchProducts: () => Promise<void>;
  setQuery: (q: string) => void;
  setCategory: (c: string) => void;
  toggleFavorite: (id: number) => void;
  toggleTheme: () => void;
};

export const useShopStore = create<ShopState>()(
  devtools(
    persist(
      (set, get) => ({
        products: [],
        status: "idle",
        error: null,
        query: "",
        category: "all",
        favorites: [],
        theme: "light",

        fetchProducts: async () => {
          set({ status: "loading", error: null }, false, "fetch/start");
          try {
            const res = await fetch("https://dummyjson.com/products?limit=100");
            if (!res.ok) throw new Error(`Erreur ${res.status}`);
            const json = await res.json();
            const mapped: Product[] = json.products.map((p: any) => ({
              id: p.id,
              title: p.title,
              price: p.price,
              description: p.description,
              category: p.category,
              image: p.thumbnail,
              rating: { rate: p.rating || 0, count: 0 },
            }));
            set({ products: mapped, status: "success" }, false, "fetch/success");
          } catch (err) {
            set(
              {
                error: err instanceof Error ? err.message : "Erreur réseau",
                status: "error",
              },
              false,
              "fetch/error"
            );
          }
        },

        setQuery: (query) => set({ query }, false, "setQuery"),
        setCategory: (category) => set({ category }, false, "setCategory"),

        toggleFavorite: (id) => {
          const favs = get().favorites;
          set(
            {
              favorites: favs.includes(id)
                ? favs.filter((f) => f !== id)
                : [...favs, id],
            },
            false,
            "toggleFavorite"
          );
        },

        toggleTheme: () => {
          const next = get().theme === "light" ? "dark" : "light";
          set({ theme: next }, false, "toggleTheme");
          if (typeof document !== "undefined") {
            document.documentElement.classList.toggle("dark", next === "dark");
          }
        },
      }),
      {
        name: "nexus-shop",
        partialize: (state) => ({
          favorites: state.favorites,
          theme: state.theme,
        }),
      }
    ),
    { name: "ShopStore" }
  )
);