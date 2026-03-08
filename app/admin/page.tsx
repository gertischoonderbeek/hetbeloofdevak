export default function AdminDashboard() {
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
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#1B3F6E] mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Beheer whitepapers, auteurs en andere content voor Het Beloofde Vak.
          </p>
        </div>

        {/* Admin Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Whitepaper Toevoegen */}
          <a
            href="/admin/whitepaper-toevoegen"
            className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#1B3F6E] hover:shadow-md transition-all group"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#1B3F6E] rounded-lg flex items-center justify-center group-hover:bg-[#153255] transition-colors">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Whitepaper Toevoegen
            </h2>
            <p className="text-gray-600">
              Upload een nieuwe whitepaper met metadata en PDF bestand.
            </p>
          </a>

          {/* Whitepapers Beheren - Coming Soon */}
          <div className="p-6 bg-white rounded-lg border border-gray-200 opacity-50">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Whitepapers Beheren
            </h2>
            <p className="text-gray-600">
              Bewerk of verwijder bestaande whitepapers. (Binnenkort beschikbaar)
            </p>
          </div>

          {/* Auteurs Beheren - Coming Soon */}
          <div className="p-6 bg-white rounded-lg border border-gray-200 opacity-50">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Auteurs Beheren
            </h2>
            <p className="text-gray-600">
              Voeg auteurs toe of bewerk hun profielen. (Binnenkort beschikbaar)
            </p>
          </div>
        </div>

        {/* Quick Stats - Placeholder */}
        <div className="mt-12 p-6 bg-white rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Overzicht
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Totaal Whitepapers</p>
              <p className="text-3xl font-bold text-[#1B3F6E]">-</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Totaal Downloads</p>
              <p className="text-3xl font-bold text-[#1B3F6E]">-</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Aanmeldingen</p>
              <p className="text-3xl font-bold text-[#1B3F6E]">-</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500 italic">
            Statistieken worden binnenkort beschikbaar
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <a href="/" className="text-[#1B3F6E] hover:underline">
            ← Terug naar homepage
          </a>
        </div>
      </div>
    </div>
  );
}
