//npm install @supabase/supabase-js
import { createClient } from "@supabase/supabase-js";

//Lendo as variavis do .env
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
const supabasePublishableKey = supabaseAnonKey;
//export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
    auth: {
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
      //storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  })