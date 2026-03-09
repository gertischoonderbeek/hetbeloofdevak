export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-400 mb-4">404</h1>
        <p className="text-slate-400 mb-6">Pagina niet gevonden</p>
        <a href="/" className="px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors">
          Terug naar home
        </a>
      </div>
    </div>
  );
}
