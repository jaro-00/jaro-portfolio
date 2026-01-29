-- Create contact_messages table for storing contact form submissions
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- Optional: Enable Row Level Security (RLS) if you want to restrict access
-- ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Optional: Create a policy to allow anonymous inserts (for contact form submissions)
-- CREATE POLICY "Allow anonymous inserts" ON contact_messages
--   FOR INSERT
--   TO anon
--   WITH CHECK (true);

-- Optional: Create a policy to allow authenticated users to read messages
-- CREATE POLICY "Allow authenticated reads" ON contact_messages
--   FOR SELECT
--   TO authenticated
--   USING (true);

