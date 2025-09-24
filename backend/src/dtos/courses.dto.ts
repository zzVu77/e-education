// Response DTO for Course model
export type CourseResponseDto = {
  id: string;
  title: string;
  description?: string;
  price: number;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  instructor: string;
  duration: number;
  imgUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};
// Request DTO for Course model
