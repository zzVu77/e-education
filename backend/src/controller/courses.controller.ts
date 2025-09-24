import { Request, Response } from "express";
import { courseService } from "../services/courses.service";
export const courseController = {
  async getAllCourses(_req: Request, res: Response) {
    try {
      const courses = await courseService.getAllCourses();
      res.json(courses);
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
