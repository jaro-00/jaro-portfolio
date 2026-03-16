-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Enable Row Level Security (RLS) for security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Allow users to read their own data (optional, since we're using custom auth)
-- CREATE POLICY "Users can read own data" ON users
--   FOR SELECT
--   TO authenticated
--   USING (auth.uid() = id);

-- For now, since using custom JWT, you might not need RLS policies
-- But you can add them later for better security

-- (OPTIONAL) If you are using the anon key from your server, allow inserts into users.
-- This is required because RLS is enabled on the users table by default.
-- If you instead set SUPABASE_SERVICE_ROLE_KEY in your server environment,
-- you can remove this policy because the service role bypasses RLS.
--
CREATE POLICY "Allow anon user signup" ON users
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create notes table for storing user notes
CREATE TABLE IF NOT EXISTS secnotes (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_secnotes_user_id ON secnotes(user_id);
CREATE INDEX IF NOT EXISTS idx_secnotes_created_at ON secnotes(created_at DESC);

-- Enable Row Level Security (RLS) for notes table
ALTER TABLE secnotes ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own notes
CREATE POLICY "Users can view own notes" ON secnotes
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id::text);

-- Policy: Users can insert their own notes
CREATE POLICY "Users can insert own notes" ON secnotes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id::text);

-- Policy: Users can update their own notes
CREATE POLICY "Users can update own notes" ON secnotes
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = user_id::text)
  WITH CHECK (auth.uid()::text = user_id::text);

-- Policy: Users can delete their own notes
CREATE POLICY "Users can delete own notes" ON secnotes
  FOR DELETE
  TO authenticated
  USING (auth.uid()::text = user_id::text);

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

