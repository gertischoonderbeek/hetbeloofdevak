## Project

Thought leadership platform voor vakprofessionals. Eerste manifest: accountancy. Domein: [hetbeloofdevak.nl](http://hetbeloofdevak.nl)

## Stack

- Next.js 16 met App Router (Turbopack)
- Supabase — database en storage
- Tailwind CSS
- TypeScript
- Vercel deployment (nog niet live)
- GitHub: https://github.com/gertischoonderbeek/hetbeloofdevak

## Database tabellen (Supabase)

### whitepapers

- id (uuid)
- titel (text)
- slug (text)
- auteur_id (uuid, FK naar auteurs)
- samenvatting (text)
- pdf_url (text)
- branche (text)
- gepubliceerd_op (date)
- zichtbaar (boolean) — moet TRUE zijn om te verschijnen
- aangemaakt_op / bijgewerkt_op (timestamps)

### auteurs

- id (uuid)
- naam (text)
- bio (text)
- foto_url (text)
- organisatie (text)
- linkedin_url (text)
- aangemaakt_op / bijgewerkt_op (timestamps)

### downloads

- id (uuid)
- whitepaper_id (uuid, FK naar whitepapers)
- email (text)
- naam (text)
- aangemeld_op (timestamp)

## Supabase Storage

- Bucket: `whitepapers` (public)
- PDF bestanden worden hier opgeslagen

## Kleurpalet

- Primair donkerblauw: `#1B3F6E`
- Achtergrond: `#0A0F1E` (donker, Nodus stijl)
- Kaarten: `#FFFFFF` of lichtgrijs `#F8F9FA`
- Accent: blauw gradient van `#1B3F6E` naar `#2C5F8A`

## Design stijl

- Gebaseerd op Nodus Agent Template ([ui.aceternity.com](http://ui.aceternity.com))
- Donkere achtergrond, subtiele blauwe gradiënts
- Google Fonts: Playfair Display voor headlines, Inter voor bodytekst
- Premium, professioneel, thought leadership uitstraling

## Conventies

- Alle teksten in het Nederlands
- Componenten in `/app/components`
- Supabase client via `lib/supabase.ts`
- Omgevingsvariabelen in `.env.local` (nooit committen naar GitHub)
- Pagina's in `/app/[paginanaam]/page.tsx`

## Werkende functionaliteit

- ✅ Homepage met hero sectie
- ✅ Whitepapers overzichtspagina
- ✅ PDF upload via admin pagina (`/admin/whitepaper-toevoegen`)
- ✅ Download knop per whitepaper
- ✅ Supabase database en storage gekoppeld
- ✅ Code op GitHub

## Openstaande taken

- [ ]  E-mail gate bij download (naam + e-mail vragen, opslaan in downloads tabel)
- [ ]  Auteurspagina overzicht (`/auteurs`)
- [ ]  Auteursprofiel individueel (`/auteurs/[naam]`)
- [ ]  Over pagina (`/over`)
- [ ]  Design verfijnen in Nodus stijl (donkere achtergrond, gradiënts)
- [ ]  Vercel deployment
- [ ]  Domein [hetbeloofdevak.nl](http://hetbeloofdevak.nl) koppelen
- [ ]  Discourse integratie (community discussies)
- [ ]  Automatisch Discourse topic aanmaken bij nieuwe whitepaper
- [ ]  Loading state op upload knop (voorkomt dubbele uploads)

## Veelgemaakte fouten — voorkom deze

- `zichtbaar = false` → whitepaper niet zichtbaar. Altijd op TRUE zetten na upload
- RLS policies moeten aan staan voor alle tabellen
- Storage bucket moet public zijn
- Nooit twee instanties van `npm run dev` tegelijk draaien
- Altijd één bestand per keer aanpassen — geen grote redesign opdrachten

## Werkinstructies voor Claude Code

- Pas altijd één bestand tegelijk aan
- Geef altijd het exacte bestandspad op
- Test na elke wijziging of de build slaagt met `npm run build`
- Commit na elke werkende stap: `git add . && git commit -m "beschrijving" && git push`