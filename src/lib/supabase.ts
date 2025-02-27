import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Log the environment variables (without exposing sensitive data)
console.log("Supabase URL available:", !!supabaseUrl);
console.log("Supabase Anon Key available:", !!supabaseAnonKey);

// Only create the client if the URL and key are available
let supabaseClient;

if (supabaseUrl && supabaseAnonKey) {
  console.log("Initializing Supabase client with provided credentials");
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn(
    "Supabase URL or anon key not provided. Using mock client for development.",
  );
  // Create a mock client that returns empty data for development
  supabaseClient = {
    from: (table) => {
      console.log(`Mock client: accessing table ${table}`);
      return {
        insert: (data) => {
          console.log(`Mock client: inserting data into ${table}`, data);
          return {
            select: () => ({
              single: async () => {
                console.log(`Mock client: returning mock data for ${table}`);
                // Ensure user_id is present in mock data
                const mockData = {
                  id: "mock-id-" + Date.now(),
                  ...data,
                  created_at: new Date().toISOString(),
                  user_id: data.user_id || "mock-user-123",
                };
                console.log(`Mock data with user_id:`, mockData);
                return {
                  data: mockData,
                  error: null,
                };
              },
            }),
          };
        },
        select: async () => {
          console.log(`Mock client: selecting from ${table}`);
          return { data: [], error: null };
        },
        order: () => ({
          select: async () => {
            console.log(`Mock client: ordering and selecting from ${table}`);
            return { data: [], error: null };
          },
        }),
        delete: () => ({
          eq: (column, value) => {
            console.log(
              `Mock client: deleting from ${table} where ${column} = ${value}`,
            );
            return { data: null, error: null };
          },
        }),
      };
    },
  };
}

export const supabase = supabaseClient;
