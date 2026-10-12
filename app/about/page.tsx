import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Case Study — Nexus Shop",
  description: "L'histoire du projet, mes choix techniques et un défi résolu.",
};

export default function AboutPage() {
  return (
    <Container className="py-10 sm:py-16">
      <article className="prose prose-slate mx-auto max-w-3xl dark:prose-invert">
        <h1 className="text-3xl font-bold sm:text-4xl">Case Study</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Comment j'ai construit Nexus Shop — et pourquoi.
        </p>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">🎯 Le problème</h2>
          <p className="mt-4 leading-relaxed">
            Après avoir construit plusieurs projets frontend simples, je voulais
            un projet qui démontre ma capacité à gérer un vrai produit : plusieurs
            pages, état global persistant, comportements cohérents entre les vues,
            et une expérience utilisateur soignée.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">🛠️ Choix techniques</h2>

          <h3 className="mt-6 text-lg font-semibold">Next.js 15 (App Router)</h3>
          <p className="mt-2 leading-relaxed">
            Le routing basé sur les fichiers m'a permis de créer 5 pages en
            quelques minutes. Les Server Components réduisent le JS envoyé au
            client. Les routes dynamiques comme <code>/products/[id]</code> sont
            natives.
          </p>

          <h3 className="mt-6 text-lg font-semibold">Zustand + persist</h3>
          <p className="mt-2 leading-relaxed">
            J'avais besoin d'un état partagé entre les pages (favoris, thème,
            filtres). Redux aurait été trop lourd. Le middleware <code>persist</code>{" "}
            sauvegarde automatiquement les favoris et le thème dans{" "}
            <code>localStorage</code>, donc ils survivent au rechargement.
          </p>

          <h3 className="mt-6 text-lg font-semibold">Tailwind CSS v4</h3>
          <p className="mt-2 leading-relaxed">
            Le dark mode avec <code>@custom-variant</code> est très propre. Pas
            besoin de dupliquer chaque classe — une seule déclaration gère tout.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">🚧 Le défi : éviter le flash blanc au chargement</h2>
          <p className="mt-4 leading-relaxed">
            Mon premier essai appliquait le thème sombre après l'hydratation React.
            Résultat : un flash blanc visible pendant ~200ms au chargement pour
            les utilisateurs en mode sombre. Inacceptable.
          </p>
          <p className="mt-4 leading-relaxed">
            La solution : un script inline dans le <code>&lt;head&gt;</code> qui
            lit <code>localStorage</code> <em>avant</em> que React ne démarre, et
            ajoute la classe <code>dark</code> immédiatement. Combiné à{" "}
            <code>suppressHydrationWarning</code> sur <code>&lt;html&gt;</code>,
            le flash a disparu.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">✨ Stretch goals atteints</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              <strong>Dark mode</strong> — persisté, sans flash, sur toutes les pages
            </li>
            <li>
              <strong>Animations</strong> — fade-in des cartes, slide-in du menu mobile
            </li>
            <li>
              <strong>Accessibilité</strong> — aria-labels, focus visible, contrastes AA
            </li>
          </ul>
        </section>
      </article>
    </Container>
  );
}