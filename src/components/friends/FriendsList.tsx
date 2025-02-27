import { useState, useEffect } from "react";
import { User, UserPlus, UserCheck, UserX, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { User as UserType, FriendConnection } from "@/types/supabase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import InviteFriendModal from "./InviteFriendModal";

interface FriendsListProps {
  userId?: string;
}

// Mock data for storyboard/preview mode
const mockFriends: UserType[] = [
  {
    id: "1",
    email: "jane.smith@example.com",
    display_name: "Jane Smith",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    email: "john.doe@example.com",
    display_name: "John Doe",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const mockPendingRequests: { user: UserType; connection: FriendConnection }[] =
  [
    {
      user: {
        id: "3",
        email: "alex.johnson@example.com",
        display_name: "Alex Johnson",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      connection: {
        id: "101",
        sender_id: "3",
        receiver_id: "123e4567-e89b-12d3-a456-426614174000",
        status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    },
  ];

const mockSentRequests: { user: UserType; connection: FriendConnection }[] = [
  {
    user: {
      id: "4",
      email: "sarah.williams@example.com",
      display_name: "Sarah Williams",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    connection: {
      id: "102",
      sender_id: "123e4567-e89b-12d3-a456-426614174000",
      receiver_id: "4",
      status: "pending",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
];

const FriendsList = ({ userId }: FriendsListProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [friends, setFriends] = useState<UserType[]>([]);
  const [pendingRequests, setPendingRequests] = useState<
    { user: UserType; connection: FriendConnection }[]
  >([]);
  const [sentRequests, setSentRequests] = useState<
    { user: UserType; connection: FriendConnection }[]
  >([]);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("friends");

  useEffect(() => {
    // Check if we're in a storyboard/preview environment
    const isStoryboard =
      window.location.pathname.includes("/tempobook/") || !userId;

    if (isStoryboard) {
      // Use mock data for storyboard/preview
      setFriends(mockFriends);
      setPendingRequests(mockPendingRequests);
      setSentRequests(mockSentRequests);
      setIsLoading(false);
      return;
    }

    if (!userId) return;

    const fetchFriends = async () => {
      setIsLoading(true);
      try {
        // Fetch accepted connections where the user is either sender or receiver
        const { data: connections, error } = await supabase
          .from("friend_connections")
          .select("*, sender:sender_id(*), receiver:receiver_id(*)")
          .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
          .order("created_at", { ascending: false });

        if (error) throw error;

        // Process connections into appropriate categories
        const acceptedFriends: UserType[] = [];
        const pending: { user: UserType; connection: FriendConnection }[] = [];
        const sent: { user: UserType; connection: FriendConnection }[] = [];

        connections.forEach((connection: any) => {
          // Determine if the current user is the sender or receiver
          const isSender = connection.sender_id === userId;
          const otherUser = isSender ? connection.receiver : connection.sender;

          if (connection.status === "accepted") {
            acceptedFriends.push(otherUser);
          } else if (connection.status === "pending") {
            if (isSender) {
              sent.push({ user: otherUser, connection });
            } else {
              pending.push({ user: otherUser, connection });
            }
          }
        });

        setFriends(acceptedFriends);
        setPendingRequests(pending);
        setSentRequests(sent);
      } catch (error) {
        console.error("Error fetching friends:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFriends();

    // Set up realtime subscription for friend connections
    const subscription = supabase
      .channel("friend_connections_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "friend_connections" },
        () => fetchFriends(),
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);

  const handleAcceptRequest = async (connectionId: string) => {
    try {
      const { error } = await supabase
        .from("friend_connections")
        .update({ status: "accepted", updated_at: new Date().toISOString() })
        .eq("id", connectionId);

      if (error) throw error;
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleRejectRequest = async (connectionId: string) => {
    try {
      const { error } = await supabase
        .from("friend_connections")
        .update({ status: "rejected", updated_at: new Date().toISOString() })
        .eq("id", connectionId);

      if (error) throw error;
    } catch (error) {
      console.error("Error rejecting friend request:", error);
    }
  };

  const getInitials = (name: string) => {
    return name
      ? name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .toUpperCase()
      : "U";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="w-full bg-white">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold">Friends</CardTitle>
            <CardDescription>
              Connect with friends to see their progress on challenges
            </CardDescription>
          </div>
          <Button
            onClick={() => setIsInviteModalOpen(true)}
            className="flex items-center gap-2"
          >
            <UserPlus size={16} />
            Invite Friend
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="friends" className="flex items-center gap-2">
              <UserCheck size={16} />
              Friends ({friends.length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <User size={16} />
              Requests ({pendingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="sent" className="flex items-center gap-2">
              <UserPlus size={16} />
              Sent ({sentRequests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="friends" className="mt-0">
            {friends.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <User className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                <p className="text-lg font-medium">No friends yet</p>
                <p className="mt-1">Invite friends to connect with them</p>
              </div>
            ) : (
              <div className="space-y-4">
                {friends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {getInitials(friend.display_name || friend.email)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {friend.display_name || friend.email}
                        </p>
                        {friend.display_name && (
                          <p className="text-sm text-gray-500">
                            {friend.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      Connected
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="pending" className="mt-0">
            {pendingRequests.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <User className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                <p className="text-lg font-medium">No pending requests</p>
                <p className="mt-1">
                  When someone invites you, it will appear here
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map(({ user, connection }) => (
                  <div
                    key={connection.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {getInitials(user.display_name || user.email)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {user.display_name || user.email}
                        </p>
                        {user.display_name && (
                          <p className="text-sm text-gray-500">{user.email}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRejectRequest(connection.id)}
                        className="text-red-500 border-red-200 hover:bg-red-50"
                      >
                        <UserX size={16} className="mr-1" />
                        Decline
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleAcceptRequest(connection.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <UserCheck size={16} className="mr-1" />
                        Accept
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="sent" className="mt-0">
            {sentRequests.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <UserPlus className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                <p className="text-lg font-medium">No sent invitations</p>
                <p className="mt-1">Invitations you send will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sentRequests.map(({ user, connection }) => (
                  <div
                    key={connection.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {getInitials(user.display_name || user.email)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {user.display_name || user.email}
                        </p>
                        {user.display_name && (
                          <p className="text-sm text-gray-500">{user.email}</p>
                        )}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-yellow-50 text-yellow-700 border-yellow-200"
                    >
                      Pending
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      <InviteFriendModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        userId={userId}
      />
    </Card>
  );
};

export default FriendsList;
