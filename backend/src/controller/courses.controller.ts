import { Response } from "express";
import { courseService } from "../services/courses.service";
export const courseController = {
  async getAllCourses(res: Response) {
    try {
      const courses = await courseService.getAllCourses();
      res.json(courses);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
