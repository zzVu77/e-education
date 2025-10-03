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
import { Textarea } from "@/components/ui/textarea";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const courseSchema = z.object({
  id: z.string().optional(),
  image: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  level: z.string().min(1, "Level is required"),
  instructor: z.string().min(1, "Instructor is required"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0, "Price must be >= 0"),
});

type CourseFormValues = z.infer<typeof courseSchema>;

interface CourseInfoModalProps {
  children?: React.ReactNode;
  type?: "create" | "update";
  defaultValues?: Partial<CourseFormValues>;
  categories?: string[]; // thêm prop categories
  onSubmitCourse?: (data: CourseFormValues) => void;
}

export function CourseInfoModal({
  children,
  type = "create",
  defaultValues,
  categories = [], // mặc định rỗng nếu ko truyền
  onSubmitCourse,
}: CourseInfoModalProps) {
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      id: defaultValues?.id,
      image: defaultValues?.image || "",
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      level: defaultValues?.level || "",
      instructor: defaultValues?.instructor || "",
      category: defaultValues?.category || "",
      price: defaultValues?.price || 0,
    },
  });

  const handleSubmit = (data: CourseFormValues) => {
    onSubmitCourse?.(data);
    toast.success(type === "create" ? "Course created!" : "Course updated!");
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {/* Modal nhỏ gọn hơn */}
      <DialogContent className="w-full max-w-sm md:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {type === "create" ? "Add New Course" : "Edit Course"}
          </DialogTitle>
          <DialogDescription>
            {type === "create"
              ? "Fill in the course details to add a new course."
              : "Update the course information here."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* Grid responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* Upload ảnh luôn ở trên đầu ở mobile */}
              <div className="flex flex-col space-y-3 md:h-full">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Course Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = () => {
                                field.onChange(reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Preview ảnh: ở desktop full height bằng cột input */}
                {form.watch("image") && (
                  <div className="flex-1">
                    <img
                      src={form.watch("image")}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-md border"
                    />
                  </div>
                )}
              </div>

              {/* Các input */}
              <div className="space-y-4 md:flex md:flex-col md:justify-between">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter course title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter course description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Level</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            {["Beginner", "Intermediate", "Advanced"].map(
                              (lvl) => (
                                <SelectItem key={lvl} value={lvl}>
                                  {lvl}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="instructor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instructor</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter instructor name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Enter course price"
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit">
                {type === "create" ? "Add Course" : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
