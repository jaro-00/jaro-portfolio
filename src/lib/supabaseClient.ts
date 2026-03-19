import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

/**
 * Browser-safe Supabase client for client components.
 *
 * This file intentionally uses the anon key only.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
