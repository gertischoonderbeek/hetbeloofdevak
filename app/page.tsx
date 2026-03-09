"use client";

import { useState } from "react";

const NAV_LINKS = [
  { href: "/whitepapers", label: "Whitepapers" },
  { href: "/discussies", label: "Discussies" },
  { href: "/auteurs", label: "Auteurs" },
  { href: "/over", label: "Over" },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-slate-200 overflow-x-hidden">

      {/* ── Hero Section ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid opacity-60" />

        {/* Gradient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="orb-1 absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)" }} />
          <div className="orb-2 absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(129,140,248,0.1) 0%, transparent 70%)" }} />
          <div className="orb-3 absolute bottom-1/4 left-1/2 w-[350px] h-[350px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)" }} />
        </div>

        {/* Radial vignette */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, #0A0F1E 100%)" }} />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center py-24">
          {/* Badge */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-shimmer border border-blue-500/20 mb-8">
            <span className="pulse-dot w-2 h-2 rounded-full bg-blue-400 inline-block" />
            <span className="text-xs font-medium text-blue-300 tracking-wide uppercase">
              Nieuw Platform — Whitepaper Accountancy beschikbaar
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-up animation-delay-200 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight mb-6">
            <span className="gradient-text-white">Het Beloofde</span>
            <br />
            <span className="gradient-text">Vak</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in-up animation-delay-400 text-xl md:text-2xl text-slate-300 font-medium mb-6 leading-relaxed max-w-3xl mx-auto">
            AI maakt accountancy niet overbodig.
            <br className="hidden sm:block" />
            AI maakt het eindelijk het vak dat het altijd had moeten zijn.
          </p>

          <p className="animate-fade-in-up animation-delay-600 text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
            Diepgaande whitepapers over hoe kunstmatige intelligentie professionals bevrijdt
            van repetitief werk — en ruimte creëert voor wat er écht toe doet.
          </p>

          {/* CTA buttons */}
          <div className="animate-fade-in-up animation-delay-800 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/whitepapers"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:shadow-[0_0_35px_rgba(59,130,246,0.55)] hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Bekijk Whitepapers
            </a>
            <a
              href="/over"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all hover:-translate-y-0.5"
            >
              Over het Platform
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32"
          style={{ background: "linear-gradient(to bottom, transparent, #0A0F1E)" }} />
      </section>

      {/* ── Featured Whitepaper ── */}
      <section className="relative px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          {/* Section header */}
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4 uppercase tracking-wider">
              Uitgelichte Whitepaper
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Onze nieuwste publicatie
            </h2>
          </div>

          {/* Featured card */}
          <div className="relative rounded-2xl overflow-hidden glow-card border border-blue-500/15 bg-[#0D1628]">
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />

            <div className="relative p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-600/20 border border-blue-500/25 flex items-center justify-center glow-blue">
                    <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 text-xs font-medium text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded-full">
                      Accountancy
                    </span>
                    <span className="px-3 py-1 text-xs font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                      Nieuw
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-snug">
                    Het Beloofde Vak — Hoe AI accountancy teruggeeft aan Nederland
                  </h3>

                  <p className="text-slate-400 leading-relaxed mb-6 text-base md:text-lg max-w-2xl">
                    Een diepgaande analyse van hoe AI-technologie accountants bevrijdt van repetitieve
                    taken en ruimte creëert voor echte toegevoegde waarde: strategisch advies,
                    risicomanagement en zakelijke inzichten die het verschil maken.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="/whitepapers"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.45)]"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download PDF — Gratis
                    </a>
                    <div className="flex items-center gap-2 px-4 py-3 text-sm text-slate-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Leestijd: ~25 minuten
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Section — 3 cards ── */}
      <section className="relative px-6 py-16 md:py-24">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(59,130,246,0.04) 0%, transparent 70%)" }} />

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-4 uppercase tracking-wider">
              Onze Aanpak
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Waarom Het Beloofde Vak?
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Wij onderzoeken niet hoe AI banen vervangt, maar hoe het professionals
              eindelijk laat doen waar ze voor opgeleid zijn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                ),
                title: "Diepgaande Research",
                description: "Geen oppervlakkige trends. Elke whitepaper is het resultaat van grondig onderzoek naar hoe AI vakgebieden fundamenteel transformeert.",
                color: "blue",
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: "Experts aan het Woord",
                description: "Geschreven door en voor vakprofessionals. Onze auteurs staan midden in de praktijk en weten wat er écht speelt.",
                color: "indigo",
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Praktisch Toepasbaar",
                description: "Van theorie naar de werkvloer. Onze inzichten zijn direct bruikbaar voor professionals die vandaag al het verschil willen maken.",
                color: "violet",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="glow-card rounded-2xl border border-blue-500/10 bg-[#0D1628] p-7 group"
              >
                {/* Top accent line */}
                <div className={`absolute top-0 left-8 right-8 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  card.color === "blue" ? "bg-blue-500/50" :
                  card.color === "indigo" ? "bg-indigo-500/50" : "bg-violet-500/50"
                }`} />

                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                  card.color === "blue" ? "bg-blue-500/10 border border-blue-500/20" :
                  card.color === "indigo" ? "bg-indigo-500/10 border border-indigo-500/20" :
                  "bg-violet-500/10 border border-violet-500/20"
                }`}>
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{card.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-blue-500/15 bg-[#0D1628] p-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { value: "1", label: "Gepubliceerde Whitepaper", suffix: "" },
              { value: "Gratis", label: "Altijd toegankelijk", suffix: "" },
              { value: "NL", label: "Focus op Nederland", suffix: "" },
            ].map((stat, i) => (
              <div key={i} className="relative">
                {i > 0 && (
                  <div className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-blue-500/15" />
                )}
                <div className="text-3xl font-extrabold gradient-text mb-1">{stat.value}{stat.suffix}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter Signup ── */}
      <section className="relative px-6 py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at bottom, rgba(99,102,241,0.06) 0%, transparent 60%)" }} />

        <div className="relative mx-auto max-w-2xl text-center">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-violet-300 bg-violet-500/10 border border-violet-500/20 rounded-full mb-6 uppercase tracking-wider">
            Nieuwsbrief
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Blijf op de hoogte
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Ontvang nieuwe whitepapers en inzichten direct in je inbox.
            Geen spam — alleen waardevolle content.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-green-500/10 border border-green-500/25 text-green-300 font-medium">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Bedankt! Je ontvangt binnenkort updates.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jouw.email@voorbeeld.nl"
                  required
                  className="w-full pl-11 pr-5 py-4 bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-blue-500/5 rounded-xl text-white placeholder-slate-500 outline-none transition-all text-sm"
                />
              </div>
              <button
                type="submit"
                className="px-7 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] whitespace-nowrap"
              >
                Aanmelden
              </button>
            </form>
          )}

          <p className="mt-4 text-xs text-slate-600">
            Je kunt je op elk moment afmelden. Lees onze{" "}
            <a href="/privacy" className="text-slate-500 hover:text-blue-400 transition-colors underline underline-offset-2">
              privacyverklaring
            </a>
            .
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6 pt-12 pb-8 border-t border-blue-500/10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-slate-400">Het Beloofde Vak</span>
            </a>

            {/* Nav links */}
            <div className="flex flex-wrap justify-center gap-6">
              {[...NAV_LINKS, { href: "/admin", label: "Admin" }].map((link) => (
                <a key={link.href} href={link.href} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent mb-6" />

          <p className="text-center text-xs text-slate-600">
            © {new Date().getFullYear()} hetbeloofdevak.nl — Alle rechten voorbehouden
          </p>
        </div>
      </footer>
    </div>
  );
}
