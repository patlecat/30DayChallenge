import { ThumbsUp, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeedItem {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  challenge: string;
  content: string;
  image?: string;
  timestamp: Date;
  likes: number;
  comments: number;
}

interface SocialFeedProps {
  items?: FeedItem[];
}

const SocialFeed = ({ items = [] }: SocialFeedProps) => {
  // Default empty state
  if (items.length === 0) {
    return (
      <div className="bg-background rounded-lg border p-4">
        <h2 className="text-xl font-semibold mb-4">Social Feed</h2>
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            No updates from your friends yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background rounded-lg border p-4">
      <h2 className="text-xl font-semibold mb-4">Social Feed</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 bg-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                {item.user.avatar ? (
                  <img
                    src={item.user.avatar}
                    alt={item.user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-medium">
                    {item.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                )}
              </div>
              <div>
                <p className="font-medium">{item.user.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.challenge} •{" "}
                  {new Date(item.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>

            <p className="mb-3">{item.content}</p>

            {item.image && (
              <div className="mb-3 rounded-md overflow-hidden">
                <img src={item.image} alt="Post" className="w-full h-auto" />
              </div>
            )}

            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{item.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
              >
                <MessageCircle className="h-4 w-4" />
                <span>{item.comments}</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialFeed;
