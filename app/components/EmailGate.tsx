"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface WhitepaperInfo {
  id: string;
  titel: string;
  pdf_url: string;
}

interface EmailGateProps {
  whitepaper: WhitepaperInfo;
  onClose: () => void;
}

export default function EmailGate({ whitepaper, onClose }: EmailGateProps) {
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error: insertError } = await supabase.from("downloads").insert([
      {
        whitepaper_id: whitepaper.id,
        naam,
        email,
        aangemeld_op: new Date().toISOString(),
      },
    ]);

    if (insertError) {
      setError("Opslaan mislukt: " + insertError.message);
      setSubmitting(false);
      return;
    }

    onClose();
    window.open(whitepaper.pdf_url, "_blank");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-blue-500/20 bg-[#0D1628] p-8"
        style={{ boxShadow: "0 0 0 1px rgba(59,130,246,0.15), 0 24px 48px rgba(0,0,0,0.6)" }}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-8 right-8 h-px rounded-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-slate-500 hover:text-slate-300 transition-colors"
          aria-label="Sluiten"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Download Whitepaper</h2>
          <p className="text-sm text-slate-400">
            Vul je gegevens in om{" "}
            <span className="text-slate-300 font-medium">{whitepaper.titel}</span>{" "}
            te downloaden.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="gate-naam" className="block text-sm font-medium text-slate-400 mb-1.5">
              Naam <span className="text-blue-400">*</span>
            </label>
            <input
              id="gate-naam"
              type="text"
              value={naam}
              onChange={(e) => setNaam(e.target.value)}
              required
              placeholder="Je naam"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-blue-500/5 rounded-xl text-white placeholder-slate-600 outline-none transition-all text-sm"
            />
          </div>

          <div>
            <label htmlFor="gate-email" className="block text-sm font-medium text-slate-400 mb-1.5">
              E-mailadres <span className="text-blue-400">*</span>
            </label>
            <input
              id="gate-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="jouw@email.nl"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-blue-500/5 rounded-xl text-white placeholder-slate-600 outline-none transition-all text-sm"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-medium rounded-xl transition-all text-sm"
            >
              Annuleren
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 disabled:text-blue-700 text-white font-semibold rounded-xl transition-all text-sm"
              style={{ boxShadow: submitting ? "none" : "0 0 20px rgba(59,130,246,0.3)" }}
            >
              {submitting ? "Bezig…" : "Download"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-xs text-slate-600 text-center">
          Je gegevens worden alleen gebruikt om je op de hoogte te houden van nieuwe whitepapers.
        </p>
      </div>
    </div>
  );
}
