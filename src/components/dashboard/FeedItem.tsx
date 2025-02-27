import { ThumbsUp, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeedItemProps {
  user?: {
    name: string;
    avatar?: string;
  };
  challenge?: string;
  content?: string;
  image?: string;
  timestamp?: Date;
  likes?: number;
  comments?: number;
  onLike?: () => void;
  onComment?: () => void;
}

const FeedItem = ({
  user = {
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  },
  challenge = "30-Day Fitness Challenge",
  content = "Completed day 15 of my challenge! Feeling stronger every day.",
  image,
  timestamp = new Date(),
  likes = 12,
  comments = 3,
  onLike,
  onComment,
}: FeedItemProps) => {
  return (
    <div className="border rounded-lg p-4 bg-card">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm font-medium">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          )}
        </div>
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">
            {challenge} • {timestamp.toLocaleDateString()}
          </p>
        </div>
      </div>

      <p className="mb-3">{content}</p>

      {image && (
        <div className="mb-3 rounded-md overflow-hidden">
          <img src={image} alt="Post" className="w-full h-auto" />
        </div>
      )}

      <div className="flex gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1"
          onClick={onLike}
        >
          <ThumbsUp className="h-4 w-4" />
          <span>{likes}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1"
          onClick={onComment}
        >
          <MessageCircle className="h-4 w-4" />
          <span>{comments}</span>
        </Button>
      </div>
    </div>
  );
};

export default FeedItem;
