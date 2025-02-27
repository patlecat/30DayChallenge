import { useState, useEffect } from "react";
import ActiveChallenges from "../dashboard/ActiveChallenges";
import CreateChallengeModal from "./CreateChallengeModal";
import { getChallenges } from "@/lib/api";
import { Toaster } from "@/components/ui/toaster";

function ChallengesPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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

  return (
    <div className="w-full min-h-screen bg-background p-6">
      <h1 className="text-3xl font-bold mb-6">My Challenges</h1>
      <div className="max-w-4xl mx-auto">
        <ActiveChallenges
          challenges={challenges}
          onCreateChallenge={handleCreateChallenge}
        />
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

export default ChallengesPage;
