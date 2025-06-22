import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rimunhgxuaphttphocnk.supabase.co"; 
const supabaseAnonKey = "process.env.SUPABASE_ANON_KEY; //Uwaga: stary klucz Supabase był publiczny – został zrotowany, a aplikacja nie zawiera danych produkcyjnych.

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


