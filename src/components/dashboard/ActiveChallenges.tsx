import { useState, useEffect } from "react";
import ChallengeCard from "./ChallengeCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import CreateChallengeModal from "../challenges/CreateChallengeModal";
import { getChallenges, deleteChallenge } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

interface Challenge {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  progress: number;
}

interface ActiveChallengesProps {
  challenges?: Challenge[];
  onCreateChallenge?: (challenge: Omit<Challenge, "id" | "progress">) => void;
}

const ActiveChallenges = ({
  challenges: initialChallenges = [],
  onCreateChallenge,
}: ActiveChallengesProps) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function loadChallenges() {
      try {
        const data = await getChallenges();
        setChallenges(
          data.map((challenge) => ({
            id: challenge.id || "",
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

    if (initialChallenges.length === 0) {
      loadChallenges();
    } else {
      setChallenges(initialChallenges);
      setLoading(false);
    }
  }, [initialChallenges]);

  const handleCreateChallenge = (
    newChallenge: Omit<Challenge, "id" | "progress">,
  ) => {
    // Refresh challenges from the database
    getChallenges().then((data) => {
      setChallenges(
        data.map((challenge) => ({
          id: challenge.id || "",
          title: challenge.title,
          description: challenge.description,
          startDate: challenge.start_date,
          endDate: challenge.end_date,
          progress: 0,
        })),
      );
    });

    if (onCreateChallenge) {
      onCreateChallenge(newChallenge);
    }
  };

  const handleDeleteChallenge = async (id: string) => {
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
    <div className="bg-background rounded-lg border p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Active Challenges</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Challenge</span>
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading challenges...</p>
        </div>
      ) : challenges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              id={challenge.id}
              title={challenge.title}
              description={challenge.description}
              startDate={challenge.startDate}
              endDate={challenge.endDate}
              progress={challenge.progress}
              onDelete={handleDeleteChallenge}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            You don't have any active challenges yet.
          </p>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            Create Your First Challenge
          </Button>
        </div>
      )}

      <CreateChallengeModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onCreateChallenge={handleCreateChallenge}
      />
    </div>
  );
};

export default ActiveChallenges;
