import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon, KeyIcon } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Key name must be at least 2 characters" }),
  expiration: z.string(),
  scopes: z
    .array(z.string())
    .min(1, { message: "Select at least one permission scope" }),
});

interface CreateKeyModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onCreateKey?: (data: z.infer<typeof formSchema>) => void;
}

const CreateKeyModal = ({
  isOpen = true,
  onClose = () => {},
  onCreateKey = () => {},
}: CreateKeyModalProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      expiration: "30days",
      scopes: ["read"],
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onCreateKey(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <KeyIcon className="h-5 w-5" />
            Create New API Key
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to generate a new API key for your account.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My API Key" {...field} />
                  </FormControl>
                  <FormDescription>
                    Give your key a descriptive name to help you identify it
                    later.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expiration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiration</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an expiration period" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="7days">7 Days</SelectItem>
                      <SelectItem value="30days">30 Days</SelectItem>
                      <SelectItem value="90days">90 Days</SelectItem>
                      <SelectItem value="1year">1 Year</SelectItem>
                      <SelectItem value="never">Never Expires</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose when this API key should expire.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <FormLabel>Permission Scopes</FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-md p-4">
                {["read", "write", "delete", "admin"].map((scope) => (
                  <FormField
                    key={scope}
                    control={form.control}
                    name="scopes"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={scope}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(scope)}
                              onCheckedChange={(checked) => {
                                const updatedScopes = checked
                                  ? [...field.value, scope]
                                  : field.value?.filter((s) => s !== scope);
                                field.onChange(updatedScopes);
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="capitalize">
                              {scope}
                            </FormLabel>
                            <FormDescription>
                              {scope === "read" && "Access to read data only"}
                              {scope === "write" &&
                                "Permission to create and update data"}
                              {scope === "delete" &&
                                "Permission to delete data"}
                              {scope === "admin" &&
                                "Full administrative access"}
                            </FormDescription>
                          </div>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Create API Key</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateKeyModal;
