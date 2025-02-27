import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

interface InviteFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
}

const InviteFriendModal = ({
  isOpen,
  onClose,
  userId,
}: InviteFriendModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!userId) {
      toast({
        title: "Error",
        description: "You must be logged in to invite friends",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Check if we're in a storyboard/preview environment
    const isStoryboard = window.location.pathname.includes("/tempobook/");

    if (isStoryboard) {
      // Simulate success for storyboard/preview
      setTimeout(() => {
        toast({
          title: "Invitation sent",
          description: "Your friend invitation has been sent",
        });
        form.reset();
        onClose();
        setIsSubmitting(false);
      }, 1000);
      return;
    }

    try {
      // Check if the user exists
      const { data: existingUser, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("email", data.email)
        .single();

      if (userError && userError.code !== "PGRST116") {
        throw userError;
      }

      if (!existingUser) {
        toast({
          title: "User not found",
          description: "This email is not registered in our system",
          variant: "destructive",
        });
        return;
      }

      // Check if a connection already exists
      const { data: existingConnection, error: connectionError } =
        await supabase
          .from("friend_connections")
          .select("id, status")
          .or(
            `and(sender_id.eq.${userId},receiver_id.eq.${existingUser.id}),and(sender_id.eq.${existingUser.id},receiver_id.eq.${userId})`,
          )
          .maybeSingle();

      if (connectionError) throw connectionError;

      if (existingConnection) {
        if (existingConnection.status === "accepted") {
          toast({
            title: "Already connected",
            description: "You are already friends with this user",
          });
        } else if (existingConnection.status === "pending") {
          toast({
            title: "Invitation pending",
            description: "An invitation has already been sent to this user",
          });
        } else if (existingConnection.status === "rejected") {
          // Allow re-inviting if previously rejected
          const { error: updateError } = await supabase
            .from("friend_connections")
            .update({
              status: "pending",
              sender_id: userId,
              receiver_id: existingUser.id,
              updated_at: new Date().toISOString(),
            })
            .eq("id", existingConnection.id);

          if (updateError) throw updateError;

          toast({
            title: "Invitation sent",
            description: "Your friend invitation has been sent",
          });
        }
      } else {
        // Create a new connection
        const { error: insertError } = await supabase
          .from("friend_connections")
          .insert({
            sender_id: userId,
            receiver_id: existingUser.id,
            status: "pending",
          });

        if (insertError) throw insertError;

        toast({
          title: "Invitation sent",
          description: "Your friend invitation has been sent",
        });
      }

      form.reset();
      onClose();
    } catch (error) {
      console.error("Error inviting friend:", error);
      toast({
        title: "Error",
        description:
          "There was an error sending your invitation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Invite a Friend
          </DialogTitle>
          <DialogDescription>
            Enter your friend's email to send them an invitation.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="friend@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your friend must already be registered to accept your
                    invitation.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Invitation"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteFriendModal;
