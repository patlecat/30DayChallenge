import React from "react";
import { AlertCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface RevokeKeyModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  keyName?: string;
}

const RevokeKeyModal = ({
  isOpen = true,
  onClose = () => {},
  onConfirm = () => {},
  keyName = "My API Key",
}: RevokeKeyModalProps) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100">
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <AlertDialogTitle className="text-xl font-bold text-left">
            Revoke API Key
          </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogDescription className="mt-2 text-gray-600">
          Are you sure you want to revoke the API key{" "}
          <span className="font-medium text-gray-900">"{keyName}"</span>? This
          action cannot be undone and any applications using this key will
          immediately lose access.
        </AlertDialogDescription>

        <AlertDialogFooter className="mt-6">
          <AlertDialogCancel
            onClick={onClose}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Revoke Key
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RevokeKeyModal;
