import { createClient } from '@supabase/supabase-js'

// Project ID will be auto-injected during deployment
const SUPABASE_URL = 'https://<PROJECT-ID>.supabase.co'
const SUPABASE_ANON_KEY = '<ANON_KEY>'

if (SUPABASE_URL === 'https://<PROJECT-ID>.supabase.co' || SUPABASE_ANON_KEY === '<ANON_KEY>') {
  console.warn('Missing Supabase variables - using demo mode');
}

export const supabase = createClient(
  SUPABASE_URL === 'https://<PROJECT-ID>.supabase.co' ? 'https://demo.supabase.co' : SUPABASE_URL,
  SUPABASE_ANON_KEY === '<ANON_KEY>' ? 'demo-key' : SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  }
)

// Database table schemas - for when Supabase is connected
export const createTables = async () => {
  try {
    // Users table (extends Supabase auth.users)
    await supabase.from('profiles').select('*').limit(1)
    // Rooms table
    await supabase.from('rooms').select('*').limit(1)
    // Bookings table
    await supabase.from('bookings').select('*').limit(1)
    // Equipment table
    await supabase.from('equipment').select('*').limit(1)
    // Notifications table
    await supabase.from('notifications').select('*').limit(1)
  } catch (error) {
    console.log('Database not connected yet:', error.message)
  }
}