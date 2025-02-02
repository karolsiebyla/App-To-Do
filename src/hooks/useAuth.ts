import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { User } from "@supabase/supabase-js";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      console.log("Fetched user:", data.user); // Dodajemy logowanie użytkownika, żeby sprawdzić, czy jest poprawnie zwracany
      setUser(data.user ?? null);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed, current user:", session?.user); // Dodajemy logowanie przy zmianie stanu autentykacji
      setUser(session?.user ?? null);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return user;
};

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
