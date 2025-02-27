import { Progress } from "@/components/ui/progress";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChallengeCardProps {
  id?: string;
  title?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  progress?: number;
  onClick?: () => void;
  onDelete?: (id: string) => void;
}

const ChallengeCard = ({
  id,
  title = "30-Day Fitness Challenge",
  description = "Daily workout routine to improve strength and endurance",
  startDate = new Date(),
  endDate = new Date(new Date().setDate(new Date().getDate() + 30)),
  progress = 0,
  onClick,
  onDelete,
}: ChallengeCardProps) => {
  // Calculate days remaining
  const today = new Date();
  const daysTotal = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  const daysElapsed = Math.ceil(
    (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  const daysRemaining = Math.max(
    0,
    Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
  );

  // Calculate progress percentage if not provided
  const calculatedProgress =
    progress || Math.min(100, Math.max(0, (daysElapsed / daysTotal) * 100));

  return (
    <div className="bg-card border rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="cursor-pointer" onClick={onClick}>
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {description}
          </p>
        </div>
        {onDelete && id && (
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{Math.round(calculatedProgress)}%</span>
        </div>
        <Progress value={calculatedProgress} className="h-2" />

        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>
            Day {daysElapsed > 0 ? daysElapsed : 0} of {daysTotal}
          </span>
          <span>{daysRemaining} days remaining</span>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
