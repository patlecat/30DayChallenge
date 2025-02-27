import { supabase } from "./supabase";

export interface Challenge {
  id?: string;
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
  created_at?: Date;
  user_id?: string;
}

export async function createChallenge(
  challenge: Omit<Challenge, "id" | "created_at" | "user_id">,
): Promise<Challenge | null> {
  try {
    console.log("Creating challenge:", challenge);

    // For development, we'll use a hardcoded UUID that exists in auth.users
    // In a real app, this would come from the authenticated user
    const user_id = "00000000-0000-0000-0000-000000000000"; // This should be a UUID that exists in auth.users

    const { data, error } = await supabase
      .from("challenges")
      .insert({
        title: challenge.title,
        description: challenge.description,
        start_date: challenge.start_date.toISOString(),
        end_date: challenge.end_date.toISOString(),
        user_id: user_id, // Add the user_id to the challenge
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating challenge:", error);
      return null;
    }

    console.log("Challenge created successfully:", data);
    return {
      ...data,
      start_date: new Date(data.start_date),
      end_date: new Date(data.end_date),
      created_at: data.created_at ? new Date(data.created_at) : undefined,
    };
  } catch (error) {
    console.error("Exception creating challenge:", error);
    return null;
  }
}

export async function getChallenges(): Promise<Challenge[]> {
  const { data, error } = await supabase
    .from("challenges")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching challenges:", error);
    return [];
  }

  return data.map((challenge) => ({
    ...challenge,
    start_date: new Date(challenge.start_date),
    end_date: new Date(challenge.end_date),
    created_at: challenge.created_at
      ? new Date(challenge.created_at)
      : undefined,
  }));
}

export async function deleteChallenge(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("challenges").delete().eq("id", id);

    if (error) {
      console.error("Error deleting challenge:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Exception deleting challenge:", error);
    return false;
  }
}
