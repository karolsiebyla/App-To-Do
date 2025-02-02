// src/hooks/auth.ts
import { supabase } from "../supabaseClient";

export const signIn = async (email: string, password: string) => {
  console.log("signIn called with email:", email);
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error("signIn error:", error);
    throw error;
  }
  if (!data.user?.email_confirmed_at) {
    console.error("Email not confirmed for user:", email);
    throw new Error("Email not confirmed");
  }
  console.log("signIn successful for user:", email);
  return data;
};

export const signUp = async (email: string, password: string) => {
  console.log("signUp called with email:", email);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    console.error("signUp error:", error);
    throw error;
  }
  console.log("signUp successful for user:", email);
  return data;
};
