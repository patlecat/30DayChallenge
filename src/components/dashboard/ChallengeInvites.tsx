import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, X } from "lucide-react";

interface Invite {
  id: string;
  from: {
    name: string;
    avatar?: string;
  };
  challengeName: string;
  date: string;
}

const ChallengeInvites = () => {
  // Mock invites data
  const invites: Invite[] = [
    {
      id: "1",
      from: {
        name: "Sarah Williams",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      },
      challengeName: "30-Day Meditation",
      date: "2 hours ago",
    },
    {
      id: "2",
      from: {
        name: "Alex Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      },
      challengeName: "Coding Challenge",
      date: "Yesterday",
    },
  ];

  if (invites.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Challenge Invites</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-4">
            No pending invites
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Challenge Invites</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {invites.map((invite) => (
          <div
            key={invite.id}
            className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={invite.from.avatar} alt={invite.from.name} />
              <AvatarFallback>
                {invite.from.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">
                <span className="font-semibold">{invite.from.name}</span>{" "}
                invited you to join
              </p>
              <p className="text-sm truncate">{invite.challengeName}</p>
              <p className="text-xs text-muted-foreground">{invite.date}</p>
            </div>
            <div className="flex gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 text-green-500 hover:text-green-600 hover:bg-green-100"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ChallengeInvites;
