"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// 🔹 Schema dùng zod
const userSchema = z.object({
  _id: z.string().optional(),
  username: z.string().min(1, "Username is required"),
  fullName: z.string().min(1, "Full Name is required"),
  password: z.string().optional(), // optional khi update
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserModalProps {
  children?: React.ReactNode;
  type?: "create" | "update";
  defaultValues?: Partial<UserFormValues>;
  onSubmitUser?: (data: UserFormValues) => void;
}

export function UserModal({
  children,
  type = "create",
  defaultValues,
  onSubmitUser,
}: UserModalProps) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      _id: defaultValues?._id,
      username: defaultValues?.username || "",
      fullName: defaultValues?.fullName || "",
      password: "",
    },
  });

  const handleSubmit = (data: UserFormValues) => {
    onSubmitUser?.(data);
    toast.success(type === "create" ? "User created!" : "User updated!");
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {type === "create" ? "Add New User" : "Edit User"}
          </DialogTitle>
          <DialogDescription>
            {type === "create"
              ? "Fill in the user details to add a new user."
              : "Update the user information here."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {type === "create" ? "Password" : "Reset Password"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={
                        type === "create"
                          ? "Enter password"
                          : "Leave empty to keep"
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">
                {type === "create" ? "Add User" : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
