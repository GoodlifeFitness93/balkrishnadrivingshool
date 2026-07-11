import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://lxlylyaakiuazmoocrzx.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_iaWNKO5Qki53MZgnWlnDcg_1lfGvMoA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
