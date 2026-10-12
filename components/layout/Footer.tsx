import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-950">
      <Container>
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          © 2026 Nexus Shop — Projet de portfolio
        </p>
      </Container>
    </footer>
  );
}