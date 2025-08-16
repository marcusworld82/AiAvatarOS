/*
  # Avatar System Database Schema

  1. New Tables
    - `organizations` - Store organization data
      - `id` (uuid, primary key)
      - `name` (text)
      - `created_at` (timestamp)
    - `avatars` - Store avatar configurations
      - `id` (uuid, primary key) 
      - `org_id` (uuid, foreign key)
      - `name` (text)
      - `bio` (text)
      - `personality` (text)
      - `created_at` (timestamp)
    - `jobs` - Track generation jobs
      - `id` (uuid, primary key)
      - `org_id` (uuid, foreign key)
      - `avatar_id` (uuid, foreign key)
      - `provider` (text)
      - `model` (text)
      - `kind` (text)
      - `status` (text)
      - `input_json` (jsonb)
      - `output_json` (jsonb)
      - `error_text` (text)
      - `started_at` (timestamp)
      - `finished_at` (timestamp)
    - `assets` - Store generated content
      - `id` (uuid, primary key)
      - `org_id` (uuid, foreign key)
      - `avatar_id` (uuid, foreign key)
      - `job_id` (uuid, foreign key)
      - `type` (text)
      - `source_url` (text)
      - `meta` (jsonb)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data

  3. Sample Data
    - Insert sample organization and avatar for testing
*/

-- Organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their organizations"
  ON organizations
  FOR ALL
  TO authenticated
  USING (true);

-- Avatars table
CREATE TABLE IF NOT EXISTS avatars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  name text NOT NULL,
  bio text DEFAULT '',
  personality text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE avatars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage avatars in their organizations"
  ON avatars
  FOR ALL
  TO authenticated
  USING (true);

-- Jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  avatar_id uuid REFERENCES avatars(id) ON DELETE CASCADE,
  provider text NOT NULL,
  model text NOT NULL,
  kind text NOT NULL,
  status text NOT NULL DEFAULT 'queued',
  input_json jsonb DEFAULT '{}',
  output_json jsonb DEFAULT '{}',
  error_text text,
  started_at timestamptz DEFAULT now(),
  finished_at timestamptz
);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage jobs in their organizations"
  ON jobs
  FOR ALL
  TO authenticated
  USING (true);

-- Assets table
CREATE TABLE IF NOT EXISTS assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  avatar_id uuid REFERENCES avatars(id) ON DELETE CASCADE,
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE,
  type text NOT NULL,
  source_url text NOT NULL,
  meta jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage assets in their organizations"
  ON assets
  FOR ALL
  TO authenticated
  USING (true);

-- Insert sample data for testing
INSERT INTO organizations (id, name) VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'Demo Organization')
ON CONFLICT (id) DO NOTHING;

INSERT INTO avatars (id, org_id, name, bio, personality) VALUES 
  ('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'Maya AI', 'AI fitness coach focused on motivation and healthy living', 'Energetic, supportive, and knowledgeable')
ON CONFLICT (id) DO NOTHING;