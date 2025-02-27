import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import FriendsList from "@/components/friends/FriendsList";
import { Loader2 } from "lucide-react";

const FriendsPage = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if we're in a storyboard/preview environment
    const isStoryboard = window.location.pathname.includes("/tempobook/");

    if (isStoryboard) {
      // Use a mock user ID for storyboard/preview
      setUserId("123e4567-e89b-12d3-a456-426614174000");
      setIsLoading(false);
      return;
    }

    const fetchCurrentUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          setUserId(user.id);

          // Check if user exists in our users table
          const { data: existingUser, error } = await supabase
            .from("users")
            .select("id")
            .eq("id", user.id)
            .maybeSingle();

          if (error && error.code !== "PGRST116") throw error;

          // If user doesn't exist in our table, create them
          if (!existingUser) {
            const { error: insertError } = await supabase.from("users").insert({
              id: user.id,
              email: user.email || "",
              display_name: user.user_metadata?.full_name || null,
            });

            if (insertError) throw insertError;
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Manage Friend Connections</h1>
        <FriendsList userId={userId || undefined} />
      </div>
    </div>
  );
};

export default FriendsPage;
