import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
const supabaseUrl = "https://lxlylyaakiuazmoocrzx.supabase.co";
const supabaseAnonKey = "sb_publishable_iaWNKO5Qki53MZgnWlnDcg_1lfGvMoA";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
export {
  supabase as s
};
