import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

/**
 * Supabase client for Next.js API route handlers.
 *
 * Uses service role key when present (server-side), otherwise falls back
 * to the anon key.
 */
export const supabase = createClient(supabaseUrl, supabaseKey);