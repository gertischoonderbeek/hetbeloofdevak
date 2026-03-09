"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import EmailGate from "@/app/components/EmailGate";

interface Whitepaper {
  id: string;
  titel: string;
  slug: string;
  samenvatting: string;
  pdf_url: string;
  branche: string;
  gepubliceerd_op: string;
  auteurs: {
    naam: string;
    organisatie: string | null;
  } | null;
}

export default function WhitepapersPage() {
  const [whitepapers, setWhitepapers] = useState<Whitepaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedWhitepaper, setSelectedWhitepaper] = useState<Whitepaper | null>(null);

  useEffect(() => {
    const fetchWhitepapers = async () => {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("whitepapers")
        .select(`
          id,
          titel,
          slug,
          samenvatting,
          pdf_url,
          branche,
          gepubliceerd_op,
          auteurs (
            naam,
            organisatie
          )
        `)
        .eq("zichtbaar", true)
        .order("gepubliceerd_op", { ascending: false });

      if (fetchError) {
        console.error("Error fetching whitepapers:", fetchError);
        setError("Fout bij ophalen van whitepapers: " + fetchError.message);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setWhitepapers((data as any) || []);
      }

      setLoading(false);
    };

    fetchWhitepapers();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("nl-NL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDownloadClick = (whitepaper: Whitepaper) => {
    setSelectedWhitepaper(whitepaper);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedWhitepaper(null);
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #0A0F1E 0%, #0d1630 50%, #0A0F1E 100%)" }}>
      {/* Hero Section */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Whitepapers
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Diepgaande analyses over hoe AI verschillende vakgebieden transformeert.
            Download gratis onze whitepapers en ontdek hoe AI jouw vak kan verbeteren.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B3F6E]"></div>
              <p className="mt-4 text-white/50">Whitepapers laden...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="max-w-2xl mx-auto p-6 bg-red-900/30 border border-red-700/50 rounded-lg">
              <p className="text-red-300">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && whitepapers.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-24 w-24 text-white/20 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h2 className="text-2xl font-semibold text-white/70 mb-2">
                Nog geen whitepapers beschikbaar
              </h2>
              <p className="text-white/40">
                We zijn hard aan het werk. Binnenkort verschijnen hier onze eerste whitepapers.
              </p>
            </div>
          )}

          {/* Whitepapers Grid */}
          {!loading && !error && whitepapers.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whitepapers.map((whitepaper) => (
                <div
                  key={whitepaper.id}
                  className="group flex flex-col rounded-xl overflow-hidden border border-[#1B3F6E]/40 transition-all duration-300 hover:border-[#1B3F6E] hover:shadow-[0_0_32px_rgba(27,63,110,0.35)]"
                  style={{ background: "#111827" }}
                >
                  {/* Card Content */}
                  <div className="flex flex-col flex-1 p-6">
                    {/* Branche pill */}
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full text-[#7EB3FF] bg-[#1B3F6E]/30 border border-[#1B3F6E]/50">
                        {whitepaper.branche}
                      </span>
                    </div>

                    {/* Titel */}
                    <h3
                      className="text-xl font-bold text-white mb-3 leading-snug"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {whitepaper.titel}
                    </h3>

                    {/* Samenvatting */}
                    <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                      {whitepaper.samenvatting}
                    </p>

                    {/* Auteur + datum */}
                    <div className="mb-5 space-y-1">
                      {whitepaper.auteurs && (
                        <p className="text-xs text-white/40">
                          Door{" "}
                          <span className="text-white/60 font-medium">
                            {whitepaper.auteurs.naam}
                          </span>
                          {whitepaper.auteurs.organisatie && (
                            <span> • {whitepaper.auteurs.organisatie}</span>
                          )}
                        </p>
                      )}
                      <p className="text-xs text-white/30">
                        {formatDate(whitepaper.gepubliceerd_op)}
                      </p>
                    </div>

                    {/* Download Button */}
                    <button
                      onClick={() => handleDownloadClick(whitepaper)}
                      className="inline-flex items-center justify-center w-full px-6 py-3 rounded-lg font-semibold text-white text-sm transition-all duration-200 hover:brightness-125 hover:shadow-[0_0_20px_rgba(27,63,110,0.5)]"
                      style={{ background: "linear-gradient(135deg, #1B3F6E, #2C5F8A)" }}
                    >
                      <svg
                        className="w-4 h-4 mr-2"
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
                      Download PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* E-mail gate */}
      {showModal && selectedWhitepaper && (
        <EmailGate whitepaper={selectedWhitepaper} onClose={handleCloseModal} />
      )}

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-white/10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-2 font-medium text-white/70">Het Beloofde Vak</p>
          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} hetbeloofdevak.nl - Alle rechten voorbehouden
          </p>
        </div>
      </footer>
    </div>
  );
}
