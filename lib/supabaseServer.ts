/**
 * @fileoverview Supabase server client configuration with service role key
 * @module lib/supabaseServer
 */

import { createClient } from '@supabase/supabase-js'

/** @type {string} Supabase project URL from environment variables */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!

/** @type {string} Supabase service role key for server-side operations */
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

/**
 * Supabase server client instance with service role privileges
 * @description Configured for server-side operations with elevated permissions
 * @type {import('@supabase/supabase-js').SupabaseClient}
 */
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    /** @description Disable automatic token refresh for server operations */
    autoRefreshToken: false,
    /** @description Disable session persistence for server operations */
    persistSession: false
  }
})
