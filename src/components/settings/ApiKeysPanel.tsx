import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus, Copy, Eye, Trash2, RefreshCw } from "lucide-react";

interface ApiKey {
  id: string;
  name: string;
  lastUsed: string;
  created: string;
  expires: string;
  status: "active" | "expired";
}

interface ApiKeysPanelProps {
  keys?: ApiKey[];
}

const ApiKeysPanel = ({ keys = [] }: ApiKeysPanelProps) => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(
    keys.length > 0
      ? keys
      : [
          {
            id: "1",
            name: "Development API Key",
            lastUsed: "2023-10-15T14:30:00Z",
            created: "2023-09-01T10:00:00Z",
            expires: "2024-09-01T10:00:00Z",
            status: "active",
          },
          {
            id: "2",
            name: "Testing API Key",
            lastUsed: "2023-10-10T09:15:00Z",
            created: "2023-08-15T11:30:00Z",
            expires: "2023-08-15T11:30:00Z",
            status: "expired",
          },
          {
            id: "3",
            name: "Production API Key",
            lastUsed: "2023-10-18T16:45:00Z",
            created: "2023-07-20T08:00:00Z",
            expires: "2024-07-20T08:00:00Z",
            status: "active",
          },
        ],
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">API Keys</h2>
          <p className="text-gray-500 mt-1">
            Manage your API keys for accessing the platform programmatically
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              Create New Key
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New API Key</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Create Key Form Content */}
              <p>Form fields for creating a new API key would go here</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your API Keys</CardTitle>
          <CardDescription>
            These keys allow programmatic access to your account. Keep them
            secure and never share them publicly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell className="font-medium">{key.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        key.status === "active" ? "default" : "destructive"
                      }
                    >
                      {key.status === "active" ? "Active" : "Expired"}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(key.lastUsed)}</TableCell>
                  <TableCell>{formatDate(key.created)}</TableCell>
                  <TableCell>{formatDate(key.expires)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon">
                              <Copy size={16} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copy Key ID</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Eye size={16} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>API Key Details</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            {/* Key Details Content */}
                            <p>API key details would be displayed here</p>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              disabled={key.status === "expired"}
                            >
                              <RefreshCw size={16} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Refresh Key</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-red-500 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Revoke API Key</AlertDialogTitle>
                          </AlertDialogHeader>
                          <div className="py-4">
                            <p>
                              Are you sure you want to revoke this API key? This
                              action cannot be undone.
                            </p>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline">Cancel</Button>
                            <Button variant="destructive">Revoke Key</Button>
                          </div>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiKeysPanel;
