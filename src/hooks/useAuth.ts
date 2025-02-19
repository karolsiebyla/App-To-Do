//src/hooks/useAuth.ts
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { User } from "@supabase/supabase-js";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        console.log("Fetched user from Supabase:", data?.user);
        setUser(data?.user || null);
      }
      setLoading(false);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        console.log("Auth state changed. Session:", session);
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
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
