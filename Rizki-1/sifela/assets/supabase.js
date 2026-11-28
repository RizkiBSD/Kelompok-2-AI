// Konfigurasi klien Supabase untuk Sifela.id.
// Variabel environment dibaca melalui Vite (prefix VITE_) saat dev/build.
import { createClient } from '@supabase/supabase-js'

// Nilai default publik dipakai jika environment variable belum disetel di Vercel.
// Supabase anon key memang bersifat public; akses tetap dibatasi RLS.
const DEFAULT_SUPABASE_URL = 'https://ymqqxgubfyzpsguextco.supabase.co'
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltcXF4Z3ViZnl6cHNndWV4dGNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTU4Njc3MDUsImV4cCI6MjExMTQ0MzcwNX0.DuTRf3CXpDEaGWdp8X5nvssbFBNog2zOZVWQUFqCz_A'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY pada file .env.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})
