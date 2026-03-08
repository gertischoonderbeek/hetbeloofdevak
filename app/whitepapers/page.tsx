"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

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
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

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
        setWhitepapers(data || []);
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
    setModalError(null);
    setNaam("");
    setEmail("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedWhitepaper(null);
    setNaam("");
    setEmail("");
    setModalError(null);
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWhitepaper) return;

    setSubmitting(true);
    setModalError(null);

    try {
      // Sla download record op in database
      const { error: insertError } = await supabase
        .from("downloads")
        .insert([
          {
            whitepaper_id: selectedWhitepaper.id,
            naam: naam,
            email: email,
            aangemeld_op: new Date().toISOString(),
          },
        ]);

      if (insertError) {
        console.error("Error saving download record:", insertError);
        setModalError("Fout bij opslaan: " + insertError.message);
        setSubmitting(false);
        return;
      }

      // Sluit modal
      handleCloseModal();

      // Trigger PDF download
      window.open(selectedWhitepaper.pdf_url, "_blank");
    } catch (error) {
      console.error("Unexpected error:", error);
      setModalError("Er is een onverwachte fout opgetreden.");
      setSubmitting(false);
    }
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

      {/* Download Modal */}
      {showModal && selectedWhitepaper && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 relative">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Sluiten"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#1B3F6E] mb-2">
                Download Whitepaper
              </h2>
              <p className="text-gray-600 text-sm">
                Vul je gegevens in om <span className="font-semibold">{selectedWhitepaper.titel}</span> te downloaden.
              </p>
            </div>

            {/* Error Message */}
            {modalError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                {modalError}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleModalSubmit}>
              {/* Naam */}
              <div className="mb-4">
                <label htmlFor="modal-naam" className="block text-sm font-semibold text-gray-700 mb-2">
                  Naam *
                </label>
                <input
                  type="text"
                  id="modal-naam"
                  value={naam}
                  onChange={(e) => setNaam(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1B3F6E] focus:ring-2 focus:ring-[#1B3F6E]/20"
                  placeholder="Je naam"
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <label htmlFor="modal-email" className="block text-sm font-semibold text-gray-700 mb-2">
                  E-mailadres *
                </label>
                <input
                  type="email"
                  id="modal-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1B3F6E] focus:ring-2 focus:ring-[#1B3F6E]/20"
                  placeholder="je.email@voorbeeld.nl"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-[#1B3F6E] text-white font-semibold rounded-lg hover:bg-[#153255] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {submitting ? "Bezig..." : "Download"}
                </button>
              </div>

              {/* Privacy Note */}
              <p className="mt-4 text-xs text-gray-500 text-center">
                We gebruiken je gegevens alleen om je op de hoogte te houden van nieuwe whitepapers.
              </p>
            </form>
          </div>
        </div>
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
