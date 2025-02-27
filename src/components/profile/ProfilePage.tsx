import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  Share2,
  Trophy,
  Award,
  Flame,
  BarChart2,
  Clock,
} from "lucide-react";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock user data
  const user = {
    name: "John Doe",
    username: "johndoe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    joinDate: "March 2023",
    bio: "Fitness enthusiast and challenge lover. Working on becoming a better version of myself every day.",
    stats: {
      activeChallenges: 3,
      completedChallenges: 7,
      currentStreak: 15,
      longestStreak: 28,
      totalDaysCompleted: 142,
    },
    badges: [
      {
        id: 1,
        name: "First Challenge",
        icon: <Trophy className="h-6 w-6" />,
        date: "Apr 12, 2023",
      },
      {
        id: 2,
        name: "7-Day Streak",
        icon: <Flame className="h-6 w-6" />,
        date: "May 3, 2023",
      },
      {
        id: 3,
        name: "Challenge Master",
        icon: <Award className="h-6 w-6" />,
        date: "Jun 18, 2023",
      },
      {
        id: 4,
        name: "Social Butterfly",
        icon: <Share2 className="h-6 w-6" />,
        date: "Jul 5, 2023",
      },
    ],
    activeChallenges: [
      {
        id: 1,
        title: "Morning Yoga",
        progress: 70,
        daysCompleted: 21,
        totalDays: 30,
        startDate: "Jul 1, 2023",
        endDate: "Jul 30, 2023",
      },
      {
        id: 2,
        title: "Reading Challenge",
        progress: 40,
        daysCompleted: 12,
        totalDays: 30,
        startDate: "Jul 10, 2023",
        endDate: "Aug 9, 2023",
      },
      {
        id: 3,
        title: "Meditation",
        progress: 23,
        daysCompleted: 7,
        totalDays: 30,
        startDate: "Jul 15, 2023",
        endDate: "Aug 14, 2023",
      },
    ],
    recentActivity: [
      {
        id: 1,
        type: "completed",
        challenge: "Morning Yoga",
        date: "Today",
        day: 21,
      },
      {
        id: 2,
        type: "completed",
        challenge: "Reading Challenge",
        date: "Today",
        day: 12,
      },
      {
        id: 3,
        type: "missed",
        challenge: "Meditation",
        date: "Yesterday",
        day: 6,
      },
      {
        id: 4,
        type: "completed",
        challenge: "Morning Yoga",
        date: "2 days ago",
        day: 20,
      },
      {
        id: 5,
        type: "completed",
        challenge: "Reading Challenge",
        date: "2 days ago",
        day: 11,
      },
    ],
  };

  return (
    <div className="w-full min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Profile Header */}
          <div className="md:w-1/3">
            <Card className="bg-card">
              <CardHeader className="pb-2">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-2xl">{user.name}</CardTitle>
                  <CardDescription className="text-center mt-1">
                    @{user.username}
                  </CardDescription>
                  <CardDescription className="text-center">
                    Member since {user.joinDate}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground mb-4">
                  {user.bio}
                </p>
                <div className="flex justify-center space-x-2 mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Share2 className="h-4 w-4" />
                    Share Profile
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-muted rounded-md p-2">
                    <p className="text-2xl font-bold">
                      {user.stats.activeChallenges}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Active Challenges
                    </p>
                  </div>
                  <div className="bg-muted rounded-md p-2">
                    <p className="text-2xl font-bold">
                      {user.stats.completedChallenges}
                    </p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                  <div className="bg-muted rounded-md p-2">
                    <p className="text-2xl font-bold">
                      {user.stats.currentStreak}
                    </p>
                    <p className="text-xs text-muted-foreground">Day Streak</p>
                  </div>
                  <div className="bg-muted rounded-md p-2">
                    <p className="text-2xl font-bold">
                      {user.stats.totalDaysCompleted}
                    </p>
                    <p className="text-xs text-muted-foreground">Total Days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:w-2/3">
            <Tabs
              defaultValue="overview"
              className="w-full"
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="challenges">Challenges</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4 mt-4">
                {/* Current Streak */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Flame className="h-5 w-5 mr-2 text-orange-500" />
                      Current Streak
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold">
                          {user.stats.currentStreak} days
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Longest streak: {user.stats.longestStreak} days
                        </p>
                      </div>
                      <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center">
                        <Flame className="h-8 w-8 text-orange-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Active Challenges */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <BarChart2 className="h-5 w-5 mr-2 text-blue-500" />
                      Active Challenges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {user.activeChallenges.map((challenge) => (
                        <div key={challenge.id} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <p className="font-medium">{challenge.title}</p>
                            <p className="text-sm">
                              {challenge.daysCompleted}/{challenge.totalDays}{" "}
                              days
                            </p>
                          </div>
                          <Progress
                            value={challenge.progress}
                            className="h-2"
                          />
                          <p className="text-xs text-muted-foreground">
                            {challenge.startDate} - {challenge.endDate}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-green-500" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {user.recentActivity.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-center gap-3 border-b pb-2 last:border-0"
                        >
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center ${activity.type === "completed" ? "bg-green-100" : "bg-red-100"}`}
                          >
                            {activity.type === "completed" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-green-500"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-red-500"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{activity.challenge}</p>
                            <p className="text-xs text-muted-foreground">
                              {activity.type === "completed"
                                ? "Completed"
                                : "Missed"}{" "}
                              Day {activity.day} • {activity.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Challenges Tab */}
              <TabsContent value="challenges" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Challenge History</CardTitle>
                    <CardDescription>
                      View all your active and completed challenges
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-3">
                          Active Challenges ({user.stats.activeChallenges})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {user.activeChallenges.map((challenge) => (
                            <Card key={challenge.id} className="bg-muted/50">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base">
                                  {challenge.title}
                                </CardTitle>
                                <CardDescription className="text-xs">
                                  {challenge.startDate} - {challenge.endDate}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span>Progress</span>
                                    <span>{challenge.progress}%</span>
                                  </div>
                                  <Progress
                                    value={challenge.progress}
                                    className="h-2"
                                  />
                                  <p className="text-xs text-muted-foreground">
                                    {challenge.daysCompleted} of{" "}
                                    {challenge.totalDays} days completed
                                  </p>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-3">
                          Completed Challenges ({user.stats.completedChallenges}
                          )
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[...Array(2)].map((_, i) => (
                            <Card key={i} className="bg-muted/50">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base">
                                  {i === 0
                                    ? "Daily Meditation"
                                    : "Water Intake Challenge"}
                                </CardTitle>
                                <CardDescription className="text-xs">
                                  {i === 0
                                    ? "May 1, 2023 - May 30, 2023"
                                    : "Jun 1, 2023 - Jun 30, 2023"}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span>Completed</span>
                                    <span>100%</span>
                                  </div>
                                  <Progress value={100} className="h-2" />
                                  <p className="text-xs text-muted-foreground">
                                    30 of 30 days completed
                                  </p>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Achievements Tab */}
              <TabsContent value="achievements" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Badges & Achievements</CardTitle>
                    <CardDescription>
                      Milestones you've reached on your journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {user.badges.map((badge) => (
                        <div
                          key={badge.id}
                          className="flex flex-col items-center text-center p-3 bg-muted/50 rounded-lg"
                        >
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                            {badge.icon}
                          </div>
                          <h3 className="font-medium text-sm">{badge.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {badge.date}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <h3 className="font-semibold mb-3">Statistics</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-muted/50 p-3 rounded-lg text-center">
                          <p className="text-2xl font-bold">
                            {user.stats.totalDaysCompleted}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Total Days Completed
                          </p>
                        </div>
                        <div className="bg-muted/50 p-3 rounded-lg text-center">
                          <p className="text-2xl font-bold">
                            {user.stats.longestStreak}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Longest Streak
                          </p>
                        </div>
                        <div className="bg-muted/50 p-3 rounded-lg text-center">
                          <p className="text-2xl font-bold">
                            {user.stats.completedChallenges}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Challenges Completed
                          </p>
                        </div>
                        <div className="bg-muted/50 p-3 rounded-lg text-center">
                          <p className="text-2xl font-bold">83%</p>
                          <p className="text-xs text-muted-foreground">
                            Completion Rate
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
