"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email signup
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-[#1B3F6E]">
              Het Beloofde Vak
            </a>
            <div className="flex gap-8">
              <a href="/whitepapers" className="text-gray-700 hover:text-[#1B3F6E] font-medium transition-colors">
                Whitepapers
              </a>
              <a href="/discussies" className="text-gray-700 hover:text-[#1B3F6E] font-medium transition-colors">
                Discussies
              </a>
              <a href="/auteurs" className="text-gray-700 hover:text-[#1B3F6E] font-medium transition-colors">
                Auteurs
              </a>
              <a href="/over" className="text-gray-700 hover:text-[#1B3F6E] font-medium transition-colors">
                Over
              </a>
              <a href="/admin" className="text-gray-700 hover:text-[#1B3F6E] font-medium transition-colors">
                Admin
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-[#1B3F6E] mb-8 leading-tight">
            Het Beloofde Vak
          </h1>

          <p className="text-2xl md:text-3xl text-gray-800 font-medium mb-12 leading-relaxed">
            AI maakt accountancy niet overbodig. AI maakt het eindelijk het vak dat het altijd had moeten zijn.
          </p>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Het Beloofde Vak is een platform dat diepgaande whitepapers publiceert over hoe
            kunstmatige intelligentie verschillende vakgebieden fundamenteel transformeert.
            We onderzoeken niet hoe AI banen vervangt, maar hoe het professionals in staat stelt
            hun vak eindelijk uit te oefenen zoals het bedoeld was.
          </p>
        </div>
      </section>

      {/* Latest Whitepaper Section */}
      <section className="px-6 py-16 bg-gradient-to-br from-[#1B3F6E] to-[#2a5a94]">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6">
            <span className="inline-block px-4 py-1 bg-white/20 text-white text-sm font-medium rounded-full mb-4">
              Nieuwste Whitepaper
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Het Beloofde Vak — Hoe AI accountancy teruggeeft aan Nederland
            </h2>
            <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              Een diepgaande analyse van hoe AI-technologie accountants bevrijdt van repetitieve
              taken en ruimte creëert voor echte toegevoegde waarde: strategisch advies,
              risicomanagement en zakelijke inzichten die het verschil maken.
            </p>
          </div>

          <button className="inline-flex items-center px-8 py-4 bg-white text-[#1B3F6E] font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-lg">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download Whitepaper (PDF)
          </button>
        </div>
      </section>

      {/* Email Signup Section */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1B3F6E] mb-4">
            Blijf op de hoogte
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Ontvang nieuwe whitepapers en inzichten direct in je inbox.
            Geen spam, alleen waardevolle content.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="je.email@voorbeeld.nl"
              required
              className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#1B3F6E] text-lg"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-[#1B3F6E] text-white font-semibold rounded-lg hover:bg-[#153255] transition-colors whitespace-nowrap"
            >
              Aanmelden
            </button>
          </form>

          {submitted && (
            <p className="mt-4 text-green-600 font-medium">
              Bedankt voor je aanmelding!
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-gray-200">
        <div className="mx-auto max-w-4xl text-center text-gray-600">
          <p className="mb-2 font-medium text-[#1B3F6E]">Het Beloofde Vak</p>
          <p className="text-sm">
            © {new Date().getFullYear()} hetbeloofdevak.nl - Alle rechten voorbehouden
          </p>
        </div>
      </footer>
    </div>
  );
}
