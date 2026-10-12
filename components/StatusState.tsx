"use client";

export function LoadingState() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="h-48 bg-slate-200 dark:bg-slate-800" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string | null; onRetry: () => void }) {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center dark:border-rose-900/50 dark:bg-rose-950/30">
      <h2 className="text-lg font-semibold text-rose-900 dark:text-rose-200">
        Oups, une erreur est survenue
      </h2>
      <p className="mt-2 text-sm text-rose-700 dark:text-rose-300">
        {message ?? "Impossible de récupérer les données."}
      </p>
      <button
        onClick={onRetry}
        className="mt-5 inline-flex h-10 items-center justify-center rounded-full bg-rose-600 px-5 text-sm font-medium text-white transition hover:bg-rose-700"
      >
        Réessayer
      </button>
    </div>
  );
}

export function EmptyState({ query }: { query: string }) {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-lg font-semibold">Aucun résultat</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        {query ? `Aucun produit ne correspond à « ${query} ».` : "Aucun produit trouvé."}
      </p>
    </div>
  );
}