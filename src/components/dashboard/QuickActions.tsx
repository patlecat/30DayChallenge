import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Calendar, BarChart, Users } from "lucide-react";

const QuickActions = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-2">
        <Button variant="outline" className="justify-start">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Challenge
        </Button>
        <Button variant="outline" className="justify-start">
          <Calendar className="mr-2 h-4 w-4" />
          Log Today's Progress
        </Button>
        <Button variant="outline" className="justify-start">
          <BarChart className="mr-2 h-4 w-4" />
          View Statistics
        </Button>
        <Button variant="outline" className="justify-start">
          <Users className="mr-2 h-4 w-4" />
          Invite Friends
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
