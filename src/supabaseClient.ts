import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rimunhgxuaphttphocnk.supabase.co"; 
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpbXVuaGd4dWFwaHR0cGhvY25rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0Mjc1MTAsImV4cCI6MjA1NDAwMzUxMH0.V7xehtuOSZisuVDopLW76YbxIAZW4OflZ_6vggz827s"; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
