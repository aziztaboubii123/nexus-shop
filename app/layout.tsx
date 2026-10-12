import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Nexus Shop — Explorateur de produits",
  description:
    "Application multi-pages avec recherche, favoris, dark mode et animations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const s = JSON.parse(localStorage.getItem("nexus-shop") || "{}");
                if (s?.state?.theme === "dark") document.documentElement.classList.add("dark");
              } catch {}
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <main className="min-h-[calc(100vh-8rem)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}