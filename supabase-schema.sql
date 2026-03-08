-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Auteurs tabel
CREATE TABLE auteurs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  naam TEXT NOT NULL,
  bio TEXT,
  foto_url TEXT,
  organisatie TEXT,
  linkedin_url TEXT,
  aangemaakt_op TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  bijgewerkt_op TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Whitepapers tabel
CREATE TABLE whitepapers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titel TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  auteur_id UUID REFERENCES auteurs(id) ON DELETE SET NULL,
  samenvatting TEXT,
  pdf_url TEXT,
  branche TEXT,
  gepubliceerd_op TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  zichtbaar BOOLEAN DEFAULT false,
  aangemaakt_op TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  bijgewerkt_op TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Downloads tabel
CREATE TABLE downloads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  whitepaper_id UUID NOT NULL REFERENCES whitepapers(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  naam TEXT,
  aangemeld_op TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes voor betere performance
CREATE INDEX idx_whitepapers_slug ON whitepapers(slug);
CREATE INDEX idx_whitepapers_auteur_id ON whitepapers(auteur_id);
CREATE INDEX idx_whitepapers_zichtbaar ON whitepapers(zichtbaar);
CREATE INDEX idx_whitepapers_gepubliceerd_op ON whitepapers(gepubliceerd_op DESC);
CREATE INDEX idx_downloads_whitepaper_id ON downloads(whitepaper_id);
CREATE INDEX idx_downloads_email ON downloads(email);

-- Optioneel: Function om bijgewerkt_op automatisch te updaten
CREATE OR REPLACE FUNCTION update_bijgewerkt_op()
RETURNS TRIGGER AS $$
BEGIN
  NEW.bijgewerkt_op = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers voor automatische timestamp updates
CREATE TRIGGER update_auteurs_bijgewerkt_op
  BEFORE UPDATE ON auteurs
  FOR EACH ROW
  EXECUTE FUNCTION update_bijgewerkt_op();

CREATE TRIGGER update_whitepapers_bijgewerkt_op
  BEFORE UPDATE ON whitepapers
  FOR EACH ROW
  EXECUTE FUNCTION update_bijgewerkt_op();

-- Commentaar op tabellen en kolommen (documentatie)
COMMENT ON TABLE auteurs IS 'Auteurs die whitepapers schrijven';
COMMENT ON TABLE whitepapers IS 'Gepubliceerde whitepapers over AI-transformatie';
COMMENT ON TABLE downloads IS 'Registratie van whitepaper downloads en email aanmeldingen';

COMMENT ON COLUMN whitepapers.slug IS 'URL-vriendelijke identifier voor whitepaper';
COMMENT ON COLUMN whitepapers.zichtbaar IS 'Of de whitepaper publiekelijk zichtbaar is';
COMMENT ON COLUMN whitepapers.branche IS 'Vakgebied/branche waar de whitepaper over gaat (bijv. accountancy, juridisch)';
