import { useState, useEffect } from "react";
import ActiveChallenges from "./dashboard/ActiveChallenges";
import SocialFeed from "./dashboard/SocialFeed";
import CreateChallengeModal from "./challenges/CreateChallengeModal";
import { getChallenges, deleteChallenge } from "@/lib/api";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

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

  const handleCreateChallenge = (newChallenge) => {
    // The actual saving is done in the modal component
    // This just refreshes the list
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

  const handleDeleteChallenge = async (id) => {
    try {
      const success = await deleteChallenge(id);
      if (success) {
        // Remove from local state
        setChallenges(challenges.filter((challenge) => challenge.id !== id));
        toast({
          title: "Challenge deleted",
          description: "The challenge has been successfully removed.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete challenge. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting challenge:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-background p-6">
      <h1 className="text-3xl font-bold mb-6">30-Day Challenge Tracker</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Active Challenges</h2>
            <button
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create Challenge
            </button>
          </div>
          {loading ? (
            <p className="text-muted-foreground">Loading challenges...</p>
          ) : challenges.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {challenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="bg-background rounded-lg border p-3 relative group"
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{challenge.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {challenge.description}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteChallenge(challenge.id)}
                      className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Delete challenge"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground mb-4">
              You don't have any active challenges yet.
            </p>
          )}
        </div>
        <div className="bg-card rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Social Feed</h2>
          <p className="text-muted-foreground">
            No updates from your friends yet.
          </p>
        </div>
      </div>

      <CreateChallengeModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onCreateChallenge={handleCreateChallenge}
      />
      <Toaster />
    </div>
  );
}

export default Home;
