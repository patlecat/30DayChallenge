import { useState } from "react";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createChallenge } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

interface CreateChallengeModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onCreateChallenge?: (challenge: {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
  }) => void;
}

const CreateChallengeModal = ({
  open = false,
  onOpenChange,
  onCreateChallenge,
}: CreateChallengeModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Submitting challenge form");

    try {
      // Validate form data
      if (!title.trim()) {
        toast({
          title: "Validation Error",
          description: "Title is required",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      if (!description.trim()) {
        toast({
          title: "Validation Error",
          description: "Description is required",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      console.log("Form data validated, saving to database");

      // Save to database
      const challengeData = {
        title,
        description,
        start_date: startDate,
        end_date: endDate,
      };

      console.log("Challenge data:", challengeData);
      const savedChallenge = await createChallenge(challengeData);
      console.log("Response from createChallenge:", savedChallenge);

      if (savedChallenge) {
        console.log("Challenge saved successfully");
        // Notify parent component
        if (onCreateChallenge) {
          onCreateChallenge({
            title,
            description,
            startDate,
            endDate,
          });
        }

        toast({
          title: "Challenge created",
          description: "Your 30-day challenge has been created successfully.",
        });

        // Reset form
        setTitle("");
        setDescription("");
        setStartDate(new Date());
        const newEndDate = new Date();
        newEndDate.setDate(newEndDate.getDate() + 30);
        setEndDate(newEndDate);

        // Close modal
        if (onOpenChange) {
          onOpenChange(false);
        }
      } else {
        console.error("Failed to create challenge, savedChallenge is null");
        toast({
          title: "Error",
          description: "Failed to create challenge. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating challenge:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create a New 30-Day Challenge</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Challenge Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter challenge title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this challenge about?"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => date && setStartDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => date && setEndDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Challenge"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChallengeModal;
