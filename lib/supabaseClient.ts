/**
 * @fileoverview Supabase client configuration for browser-side operations
 * @module lib/supabaseClient
 */

import { createClient } from '@supabase/supabase-js'

/** @type {string} Supabase project URL from environment variables */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!

/** @type {string} Supabase anonymous key for client-side authentication */
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/**
 * Supabase client instance for browser-side operations
 * @description Configured with public environment variables for client-side use
 * @type {import('@supabase/supabase-js').SupabaseClient}
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
