import { useState, useEffect } from "react";
import ActiveChallenges from "./ActiveChallenges";
import SocialFeed from "./SocialFeed";
import ChallengeInvites from "./ChallengeInvites";
import QuickActions from "./QuickActions";
import { getChallenges } from "@/lib/api";
import { Toaster } from "@/components/ui/toaster";

function Dashboard() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadChallenges() {
      try {
        const data = await getChallenges();
        setChallenges(
          data.map((challenge) => ({
            id: challenge.id,
            title: challenge.title,
            description: challenge.description,
            startDate: challenge.start_date,
            endDate: challenge.end_date,
            progress: 0, // Calculate progress based on dates
          })),
        );
      } catch (error) {
        console.error("Error loading challenges:", error);
      } finally {
        setLoading(false);
      }
    }

    loadChallenges();
  }, []);

  const handleCreateChallenge = () => {
    // Refresh challenges from the database
    getChallenges().then((data) => {
      setChallenges(
        data.map((challenge) => ({
          id: challenge.id,
          title: challenge.title,
          description: challenge.description,
          startDate: challenge.start_date,
          endDate: challenge.end_date,
          progress: 0,
        })),
      );
    });
  };

  // Mock feed items for demonstration
  const feedItems = [
    {
      id: "1",
      user: {
        name: "Jane Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      },
      challenge: "Morning Yoga",
      content: "Day 15 complete! Feeling more flexible every day.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      likes: 8,
      comments: 2,
    },
    {
      id: "2",
      user: {
        name: "Mike Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      },
      challenge: "Reading Challenge",
      content: "Finished my book for day 10! Highly recommend 'Atomic Habits'.",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      likes: 12,
      comments: 5,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-background p-6">
      <h1 className="text-3xl font-bold mb-6">My Challenge Hub</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ActiveChallenges
            challenges={challenges}
            loading={loading}
            onCreateChallenge={handleCreateChallenge}
          />

          <SocialFeed items={feedItems} />
        </div>

        <div className="space-y-6">
          <QuickActions />
          <ChallengeInvites />
        </div>
      </div>

      <Toaster />
    </div>
  );
}

export default Dashboard;
