/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
// import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Edit2 } from "iconsax-reactjs";
import { ImagePlus, Trash2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Loader2 } from "lucide-react";

// ✅ Fix lỗi File is not defined khi SSR
const FileClass = typeof File !== "undefined" ? File : class {};

// ✅ Định nghĩa schema an toàn với SSR
const courseSchemaBase = z.object({
  id: z.string().optional(), // ✅ thêm dòng này
  imgUrl: z.union([z.instanceof(FileClass), z.string()]), // Cho phép File hoặc URL string
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().optional(),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  instructor: z.string().min(1, "Instructor is required"),
  category: z.string().min(2, "Category must be at least 2 characters long"),
  price: z.number().min(0, "Price must be a positive number"),
  duration: z.number().min(1, "Duration must be at least 1 hour"),
});
const courseSchema = (type: "create" | "update" = "create") =>
  courseSchemaBase.superRefine((data, ctx) => {
    // Nếu là "create" → bắt buộc phải có ảnh
    if (type === "create") {
      if (
        (typeof data.imgUrl === "string" && data.imgUrl.trim() === "") ||
        !(data.imgUrl instanceof FileClass)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["imgUrl"],
          message: "Please upload a course image.",
        });
      }
    }

    // Nếu là "update" → cho phép string (ảnh cũ) hoặc File (ảnh mới),
    // nhưng không được "" nếu là string
    if (type === "update") {
      if (typeof data.imgUrl === "string" && data.imgUrl.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["imgUrl"],
          message: "Existing image URL cannot be empty.",
        });
      }
    }
  });
export type CourseFormValues = z.infer<ReturnType<typeof courseSchema>>;

interface CourseInfoModalProps {
  children?: React.ReactNode;
  type?: "create" | "update";
  defaultValues?: Partial<CourseFormValues>;
  categories?: string[];
  onSubmitCourse?: (data: CourseFormValues) => void;
}

export function CourseInfoModal({
  children,
  type = "create",
  defaultValues,
  categories = [],
  onSubmitCourse,
}: CourseInfoModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema(type)),
    defaultValues: {
      id: defaultValues?.id || undefined,
      imgUrl: defaultValues?.imgUrl || "",
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      level: defaultValues?.level || "Beginner",
      instructor: defaultValues?.instructor || "",
      category: defaultValues?.category || "",
      price: defaultValues?.price || 0,
      duration: defaultValues?.duration || 0,
    },
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (data: CourseFormValues) => {
    try {
      setLoading(true);
      await onSubmitCourse?.(data); // ⚡ Đợi submit thật sự hoàn thành
      form.reset();
      setOpen(false); // ✅ Đóng modal chỉ sau khi hoàn tất
    } catch (error) {
      console.error("Error submitting course:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleFileChange = (
    file: File | null,
    fieldOnChange: (value: File | string) => void,
  ) => {
    if (file) {
      fieldOnChange(file);
    }
  };

  const handleRemoveImage = (fieldOnChange: (value: File | string) => void) => {
    fieldOnChange("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-sm md:max-w-[80vw] max-h-[95vh] overflow-y-auto">
        <DialogHeader className="w-full text-center">
          <DialogTitle className="text-center">
            {type === "create" ? "Add New Course" : "Edit Course"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {type === "create"
              ? "Fill in the course details to add a new course."
              : "Update the course information here."}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-full w-full rounded-md ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => <input type="hidden" {...field} />}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/*Upload & Preview image */}
                <div className="flex flex-col space-y-3 h-full">
                  <FormField
                    control={form.control}
                    name="imgUrl"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-center w-full h-full">
                        <FormLabel>Course Image</FormLabel>

                        <div
                          className={`relative w-full h-full border-2 border-dashed rounded-md flex items-center justify-center transition min-h-[200px] ${
                            field.value
                              ? "cursor-not-allowed"
                              : "cursor-pointer hover:bg-muted"
                          }`}
                          onClick={() => {
                            if (!field.value) fileInputRef.current?.click(); // ✅ chỉ cho click khi chưa có ảnh
                          }}
                        >
                          {field.value ? (
                            <img
                              src={
                                typeof field.value === "string"
                                  ? field.value
                                  : field.value instanceof File
                                    ? URL.createObjectURL(field.value)
                                    : ""
                              }
                              alt="Preview"
                              className="w-full h-full object-cover rounded-md"
                            />
                          ) : (
                            <div className="flex flex-col items-center text-gray-500">
                              <ImagePlus className="h-10 w-10 mb-2" />
                              <span>Click to upload image</span>
                            </div>
                          )}
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleFileChange(
                                e.target.files?.[0] || null,
                                field.onChange,
                              )
                            }
                          />
                        </div>

                        {/* Edit + Remove buttons */}
                        <div className="flex gap-2 mt-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={!field.value}
                            className="flex items-center gap-1 bg-black text-white hover:bg-black/80 hover:text-white "
                          >
                            <Edit2 className="h-4 w-4" /> Edit
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => handleRemoveImage(field.onChange)}
                            disabled={!field.value}
                            className="flex items-center gap-1"
                          >
                            <Trash2 className="h-4 w-4" /> Remove
                          </Button>
                        </div>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Right column: Input fields + Add Course button */}
                <div className="flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter course title"
                              {...field}
                            />
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

                    <div className="flex flex-row justify-start gap-4 items-center w-full">
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
                    </div>
                    <FormField
                      control={form.control}
                      name="instructor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instructor</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter instructor name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-row justify-start gap-4 items-center w-full">
                      <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration (minutes)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter course duration"
                                value={field.value}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value, 10))
                                }
                                min={0}
                              />
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
                                min={0}
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
                  {/* Add course button */}
                </div>
                <div className="flex justify-center pt-2 md:col-span-2 ">
                  <Button
                    variant="viewDetails"
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto rounded-md px-20 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />{" "}
                        {/* spinner */}
                        <span>Saving...</span>
                      </>
                    ) : type === "create" ? (
                      "Add Course"
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
