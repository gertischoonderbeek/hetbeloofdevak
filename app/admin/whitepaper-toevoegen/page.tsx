"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Auteur {
  id: string;
  naam: string;
  organisatie: string | null;
}

export default function WhitepaperToevoegen() {
  const [titel, setTitel] = useState("");
  const [samenvatting, setSamenvatting] = useState("");
  const [branche, setBranche] = useState("");
  const [auteurId, setAuteurId] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [auteurs, setAuteurs] = useState<Auteur[]>([]);
  const [auteursLoading, setAuteursLoading] = useState(true);

  // Haal auteurs op bij component mount
  useEffect(() => {
    const fetchAuteurs = async () => {
      setAuteursLoading(true);
      const { data, error } = await supabase
        .from("auteurs")
        .select("id, naam, organisatie")
        .order("naam", { ascending: true });

      if (error) {
        console.error("Error fetching auteurs:", error);
        setMessage({ type: "error", text: "Fout bij ophalen auteurs: " + error.message });
      } else {
        setAuteurs(data || []);
      }
      setAuteursLoading(false);
    };

    fetchAuteurs();
  }, []);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Validatie
      if (!titel || !samenvatting || !branche || !auteurId || !pdfFile) {
        setMessage({ type: "error", text: "Vul alle velden in, selecteer een auteur en kies een PDF bestand." });
        setLoading(false);
        return;
      }

      if (pdfFile.type !== "application/pdf") {
        setMessage({ type: "error", text: "Alleen PDF bestanden zijn toegestaan." });
        setLoading(false);
        return;
      }

      // Genereer slug
      const slug = generateSlug(titel);
      const timestamp = Date.now();
      const fileName = `${slug}-${timestamp}.pdf`;

      // Stap 1: Upload PDF naar Supabase Storage
      console.log("Starting PDF upload to Supabase Storage...");
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("whitepapers")
        .upload(fileName, pdfFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        // Specifieke foutmeldingen voor veelvoorkomende problemen
        let errorMessage = "PDF upload mislukt: " + uploadError.message;

        if (uploadError.message.includes("not found")) {
          errorMessage = "Storage bucket 'whitepapers' bestaat niet. Maak deze aan in Supabase Dashboard → Storage.";
        } else if (uploadError.message.includes("permission") || uploadError.message.includes("policy")) {
          errorMessage = "Geen toestemming om te uploaden. Controleer de Storage policies in Supabase.";
        }

        setMessage({ type: "error", text: errorMessage });
        setLoading(false);
        return;
      }

      // Verificeer dat upload succesvol was
      if (!uploadData || !uploadData.path) {
        console.error("Upload succeeded but no data returned");
        setMessage({ type: "error", text: "PDF upload mislukt: geen bevestiging van Supabase ontvangen." });
        setLoading(false);
        return;
      }

      console.log("PDF upload successful:", uploadData.path);

      // Stap 2: Haal publieke URL op met het exacte pad van de upload
      const { data: urlData } = supabase.storage
        .from("whitepapers")
        .getPublicUrl(uploadData.path);

      if (!urlData || !urlData.publicUrl) {
        console.error("Failed to get public URL");
        setMessage({ type: "error", text: "Fout bij ophalen van publieke URL voor PDF." });
        setLoading(false);
        return;
      }

      const pdfUrl = urlData.publicUrl;
      console.log("PDF public URL:", pdfUrl);

      // Stap 3: Sla metadata op in database (alleen als upload succesvol was)
      console.log("Saving metadata to database...");
      const { data: whitepaperData, error: dbError } = await supabase
        .from("whitepapers")
        .insert([
          {
            titel,
            slug,
            auteur_id: auteurId,
            samenvatting,
            pdf_url: pdfUrl,
            branche,
            zichtbaar: false,
            gepubliceerd_op: new Date().toISOString(),
          },
        ])
        .select();

      if (dbError) {
        console.error("Database error:", dbError);

        // Als database insert mislukt, verwijder de geüploade PDF
        console.log("Database insert failed, cleaning up uploaded file...");
        const { error: deleteError } = await supabase.storage
          .from("whitepapers")
          .remove([uploadData.path]);

        if (deleteError) {
          console.error("Failed to clean up file:", deleteError);
        }

        setMessage({ type: "error", text: `Database fout: ${dbError.message}. De geüploade PDF is verwijderd.` });
        setLoading(false);
        return;
      }

      console.log("Whitepaper successfully created:", whitepaperData);

      // Success!
      setMessage({ type: "success", text: "Whitepaper succesvol toegevoegd!" });

      // Reset form
      setTitel("");
      setSamenvatting("");
      setBranche("");
      setAuteurId("");
      setPdfFile(null);

      // Reset file input
      const fileInput = document.getElementById("pdf-upload") as HTMLInputElement;
      if (fileInput) fileInput.value = "";

    } catch (error) {
      console.error("Unexpected error:", error);
      setMessage({ type: "error", text: "Er is een onverwachte fout opgetreden." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
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
              <a href="/admin" className="text-[#1B3F6E] hover:text-[#153255] font-medium transition-colors">
                Admin
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#1B3F6E] mb-2">
            Whitepaper Toevoegen
          </h1>
          <p className="text-gray-600">
            Vul de gegevens in en upload een PDF om een nieuwe whitepaper toe te voegen.
          </p>
        </div>

        {/* Feedback Messages */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Titel */}
          <div className="mb-6">
            <label htmlFor="titel" className="block text-sm font-semibold text-gray-700 mb-2">
              Titel *
            </label>
            <input
              type="text"
              id="titel"
              value={titel}
              onChange={(e) => setTitel(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1B3F6E] focus:ring-2 focus:ring-[#1B3F6E]/20"
              placeholder="Bijv. Het Beloofde Vak — Hoe AI accountancy teruggeeft aan Nederland"
            />
          </div>

          {/* Branche */}
          <div className="mb-6">
            <label htmlFor="branche" className="block text-sm font-semibold text-gray-700 mb-2">
              Branche *
            </label>
            <input
              type="text"
              id="branche"
              value={branche}
              onChange={(e) => setBranche(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1B3F6E] focus:ring-2 focus:ring-[#1B3F6E]/20"
              placeholder="Bijv. Accountancy, Juridisch, Zorg"
            />
          </div>

          {/* Auteur */}
          <div className="mb-6">
            <label htmlFor="auteur" className="block text-sm font-semibold text-gray-700 mb-2">
              Auteur *
            </label>
            {auteursLoading ? (
              <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500">
                Auteurs laden...
              </div>
            ) : auteurs.length === 0 ? (
              <div className="w-full px-4 py-3 border border-yellow-300 rounded-lg bg-yellow-50 text-yellow-800">
                Geen auteurs gevonden. Voeg eerst een auteur toe in de database.
              </div>
            ) : (
              <select
                id="auteur"
                value={auteurId}
                onChange={(e) => setAuteurId(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1B3F6E] focus:ring-2 focus:ring-[#1B3F6E]/20"
              >
                <option value="">Selecteer een auteur</option>
                {auteurs.map((auteur) => (
                  <option key={auteur.id} value={auteur.id}>
                    {auteur.naam}
                    {auteur.organisatie && ` (${auteur.organisatie})`}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Samenvatting */}
          <div className="mb-6">
            <label htmlFor="samenvatting" className="block text-sm font-semibold text-gray-700 mb-2">
              Samenvatting *
            </label>
            <textarea
              id="samenvatting"
              value={samenvatting}
              onChange={(e) => setSamenvatting(e.target.value)}
              required
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1B3F6E] focus:ring-2 focus:ring-[#1B3F6E]/20"
              placeholder="Schrijf een korte samenvatting van de whitepaper..."
            />
          </div>

          {/* PDF Upload */}
          <div className="mb-8">
            <label htmlFor="pdf-upload" className="block text-sm font-semibold text-gray-700 mb-2">
              PDF Bestand *
            </label>
            <input
              type="file"
              id="pdf-upload"
              accept=".pdf"
              onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1B3F6E] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#1B3F6E] file:text-white hover:file:bg-[#153255] file:cursor-pointer"
            />
            {pdfFile && (
              <p className="mt-2 text-sm text-gray-600">
                Geselecteerd: {pdfFile.name} ({(pdfFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-4 bg-[#1B3F6E] text-white font-semibold rounded-lg hover:bg-[#153255] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            <span>{loading ? "Bezig met uploaden..." : "Whitepaper Toevoegen"}</span>
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <a href="/admin" className="text-[#1B3F6E] hover:underline">
            ← Terug naar admin
          </a>
        </div>
      </div>
    </div>
  );
}
