import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";

// Pobieranie zadań z bazy Supabase
export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data, error } = await supabase.from("tasks").select("*");

      if (error) {
        console.error("Error fetching tasks:", error.message);
        throw new Error(error.message);
      }

      return data;
    },
  });
};
