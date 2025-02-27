import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, UserPlus, UserCheck } from "lucide-react";

interface Friend {
  id: string;
  name: string;
  avatar?: string;
  activeChallenges: number;
  status: "friend" | "pending";
}

const FriendsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: "1",
      name: "Jane Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      activeChallenges: 2,
      status: "friend",
    },
    {
      id: "2",
      name: "Mike Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      activeChallenges: 1,
      status: "friend",
    },
    {
      id: "3",
      name: "Sarah Williams",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      activeChallenges: 3,
      status: "pending",
    },
  ]);

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAddFriend = (id: string) => {
    setFriends(
      friends.map((friend) =>
        friend.id === id ? { ...friend, status: "friend" } : friend,
      ),
    );
  };

  return (
    <div className="w-full min-h-screen bg-background p-6">
      <h1 className="text-3xl font-bold mb-6">Friends</h1>

      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-lg border shadow-sm p-6 mb-6">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-4">
            {filteredFriends.length > 0 ? (
              filteredFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center justify-between p-3 bg-background rounded-lg border hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={friend.avatar} alt={friend.name} />
                      <AvatarFallback>
                        {friend.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{friend.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {friend.activeChallenges} active challenge
                        {friend.activeChallenges !== 1 && "s"}
                      </p>
                    </div>
                  </div>

                  {friend.status === "pending" ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddFriend(friend.id)}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Accept
                    </Button>
                  ) : (
                    <Button variant="ghost" size="sm" disabled>
                      <UserCheck className="h-4 w-4 mr-2 text-green-500" />
                      Friends
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No friends found matching your search.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
