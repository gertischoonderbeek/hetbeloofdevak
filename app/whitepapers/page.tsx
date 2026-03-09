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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-[#1B3F6E]">
              Het Beloofde Vak
            </a>
            <div className="flex gap-8">
              <a href="/whitepapers" className="text-[#1B3F6E] hover:text-[#153255] font-medium transition-colors">
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
      <section className="px-6 py-16 md:py-20 bg-gradient-to-br from-[#1B3F6E] to-[#2a5a94]">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Whitepapers
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Diepgaande analyses over hoe AI verschillende vakgebieden transformeert.
            Download gratis onze whitepapers en ontdek hoe AI jouw vak kan verbeteren.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B3F6E]"></div>
              <p className="mt-4 text-gray-600">Whitepapers laden...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="max-w-2xl mx-auto p-6 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && whitepapers.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-24 w-24 text-gray-300 mb-4"
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
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Nog geen whitepapers beschikbaar
              </h2>
              <p className="text-gray-600">
                We zijn hard aan het werk. Binnenkort verschijnen hier onze eerste whitepapers.
              </p>
            </div>
          )}

          {/* Whitepapers Grid */}
          {!loading && !error && whitepapers.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whitepapers.map((whitepaper) => (
                <div
                  key={whitepaper.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-br from-[#1B3F6E] to-[#2a5a94] px-6 py-4">
                    <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full">
                      {whitepaper.branche}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                      {whitepaper.titel}
                    </h3>

                    {whitepaper.auteurs && (
                      <p className="text-sm text-gray-600 mb-3">
                        Door{" "}
                        <span className="font-semibold text-[#1B3F6E]">
                          {whitepaper.auteurs.naam}
                        </span>
                        {whitepaper.auteurs.organisatie && (
                          <span className="text-gray-500">
                            {" "}
                            • {whitepaper.auteurs.organisatie}
                          </span>
                        )}
                      </p>
                    )}

                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {whitepaper.samenvatting}
                    </p>

                    <p className="text-sm text-gray-500 mb-4">
                      Gepubliceerd op {formatDate(whitepaper.gepubliceerd_op)}
                    </p>

                    {/* Download Button */}
                    <button
                      onClick={() => handleDownloadClick(whitepaper)}
                      className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#1B3F6E] text-white font-semibold rounded-lg hover:bg-[#153255] transition-colors"
                    >
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
