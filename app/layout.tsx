import type { Metadata } from "next";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Het Beloofde Vak — AI transformeert jouw vakgebied",
  description:
    "Het Beloofde Vak publiceert diepgaande whitepapers over hoe AI professionals in staat stelt hun vak eindelijk uit te oefenen zoals het bedoeld was.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className="antialiased" style={{ background: "#0A0F1E" }}>
        <nav className="border-b border-white/10">
          <div className="mx-auto max-w-6xl px-6 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="text-xl font-bold text-white">
                Het Beloofde Vak
              </a>
              <div className="flex gap-8">
                <a href="/whitepapers" className="text-white/60 hover:text-white font-medium transition-colors">
                  Whitepapers
                </a>
                <a href="/discussies" className="text-white/60 hover:text-white font-medium transition-colors">
                  Discussies
                </a>
                <a href="/auteurs" className="text-white/60 hover:text-white font-medium transition-colors">
                  Auteurs
                </a>
                <a href="/over" className="text-white/60 hover:text-white font-medium transition-colors">
                  Over
                </a>
                <a href="/admin" className="text-white/60 hover:text-white font-medium transition-colors">
                  Admin
                </a>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
