import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tegrgilrayyltzsccmwo.supabase.co";
const supabasePlushibableKey = "sb_publishable_Meaa2yoAkx50HIx0KFLUXw_eIxkHVqv";

export const db = createClient(supabaseUrl, supabasePlushibableKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
