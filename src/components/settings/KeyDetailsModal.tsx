import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface KeyDetailsModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  apiKey?: string;
  keyName?: string;
  createdAt?: string;
  expiresAt?: string;
}

const KeyDetailsModal = ({
  open = true,
  onOpenChange,
  apiKey = "sk_test_51KjHdUs9XjgkIUiSXjgkIUiSXjgkIUiSXjgkIUiSXjgkIUiS",
  keyName = "Production API Key",
  createdAt = new Date().toISOString(),
  expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
}: KeyDetailsModalProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>API Key Created</DialogTitle>
          <DialogDescription>
            Your new API key has been created. Please copy it now as you won't
            be able to see it again.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">API Key</h4>
            <div className="flex items-center space-x-2">
              <Input
                readOnly
                value={apiKey}
                className="font-mono text-xs bg-gray-50"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
                className="flex-shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-red-500 font-medium">
              This key will only be displayed once and cannot be retrieved
              later.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium">Key Name</h4>
              <p className="text-sm text-gray-500">{keyName}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium">Created</h4>
                <p className="text-sm text-gray-500">{formatDate(createdAt)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Expires</h4>
                <p className="text-sm text-gray-500">{formatDate(expiresAt)}</p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange?.(false)}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default KeyDetailsModal;
