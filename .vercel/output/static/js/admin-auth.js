// Supabase Admin Authentication Handler
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

let supabaseClient = null;

// Initialize Supabase Client
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  const { createClient } = window.supabase || {};
  if (createClient) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } else {
    console.error('Supabase library (window.supabase) is missing. Make sure the CDN script is included.');
  }
} else {
  console.warn('Supabase URL/Key missing. Forms will run in Demo/Offline mode.');
}

export const supabase = supabaseClient;

/**
 * Log in an admin user using email and password.
 */
export async function loginAdmin(email, password) {
  if (!supabase) {
    throw new Error('Supabase is not configured. Run schema setup and add keys to config.js.');
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password: password
  });
  return { data, error };
}

/**
 * Log out current user and redirect to login page.
 */
export async function logoutAdmin() {
  if (supabase) {
    await supabase.auth.signOut();
  }
  window.location.replace('/admin/login');
}

/**
 * Fetch current user session.
 */
export async function getSession() {
  if (!supabase) return null;
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}
