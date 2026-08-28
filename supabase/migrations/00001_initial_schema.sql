-- Initial LandGuard Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  company_name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Properties
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  property_name TEXT,
  survey_number TEXT NOT NULL,
  khasra_number TEXT,
  village TEXT NOT NULL,
  taluk TEXT NOT NULL,
  district TEXT NOT NULL,
  state TEXT NOT NULL,
  property_type TEXT,
  area TEXT,
  owner_name TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  monitoring_status TEXT DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Sources (Newspapers, Portals, etc)
CREATE TABLE sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  language TEXT NOT NULL,
  region TEXT NOT NULL,
  content_type TEXT NOT NULL,
  status TEXT DEFAULT 'Active',
  reliability_score INTEGER DEFAULT 50
);

-- 4. Disputes (The actual events extracted from sources)
CREATE TABLE disputes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  source_id UUID REFERENCES sources(id),
  cluster_id TEXT, -- To group related notices together
  title TEXT NOT NULL,
  dispute_type TEXT NOT NULL,
  date DATE NOT NULL,
  parties JSONB, -- Array of names
  court TEXT,
  case_number TEXT,
  extracted_text TEXT,
  page_number INTEGER,
  verification_status TEXT DEFAULT 'AI DETECTED',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Risk & Confidence Assessments (The new 'trust' features)
CREATE TABLE risk_assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE UNIQUE,
  overall_score INTEGER NOT NULL,
  identity_match_score INTEGER NOT NULL,
  source_trust_score INTEGER NOT NULL,
  corroboration_score INTEGER NOT NULL,
  severity_score INTEGER NOT NULL,
  risk_level TEXT NOT NULL, -- HIGH, MEDIUM, LOW
  false_positive_indicators JSONB, -- Array of field matching analysis
  impact_severity_tier TEXT,
  impact_financial_exposure TEXT,
  impact_transaction_advice TEXT,
  impact_typical_resolution TEXT,
  assessed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Alerts
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  dispute_id UUID REFERENCES disputes(id) ON DELETE CASCADE,
  risk_level TEXT NOT NULL,
  summary TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Verification Logs (Audit Trail)
CREATE TABLE verification_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dispute_id UUID REFERENCES disputes(id) ON DELETE CASCADE,
  actor UUID REFERENCES profiles(id),
  previous_status TEXT,
  new_status TEXT NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- Users can only see and edit their own properties and related data
CREATE POLICY "Users can manage their own properties" 
ON properties FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view disputes for their properties" 
ON disputes FOR SELECT USING (
  property_id IN (SELECT id FROM properties WHERE user_id = auth.uid())
);

CREATE POLICY "Users can view risk assessments for their properties" 
ON risk_assessments FOR SELECT USING (
  property_id IN (SELECT id FROM properties WHERE user_id = auth.uid())
);

CREATE POLICY "Users can manage their own alerts" 
ON alerts FOR ALL USING (auth.uid() = user_id);
