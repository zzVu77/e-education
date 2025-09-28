import { z } from "zod";

// 🎯 Request DTOs

// Create Course DTO
export const createCourseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be a positive number"),
  category: z.string().min(2, "Category must be at least 2 characters long"),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  instructor: z.string().min(2, "Instructor name must be at least 2 characters long"),
  duration: z.number().min(1, "Duration must be at least 1 hour"),
  imgUrl: z.string().url("Invalid image URL").optional(),
});
export type CreateCourseDto = z.infer<typeof createCourseSchema>;

// Update Course DTO (cho phép partial update)
export const updateCourseSchema = createCourseSchema.partial();
export type UpdateCourseDto = z.infer<typeof updateCourseSchema>;

// 🎯 Response DTO

export const courseResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  price: z.number(),
  category: z.string(),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  instructor: z.string(),
  duration: z.number(),
  imgUrl: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type CourseResponseDto = z.infer<typeof courseResponseSchema>;

export const paginatedCoursesResponseSchema = z.object({
  data: z.array(courseResponseSchema),
  totalPages: z.number(),
});

export type PaginatedCoursesResponseDto = z.infer<typeof paginatedCoursesResponseSchema>;
