import { Request, Response } from "express";
import { courseService } from "../services/courses.service";
import { CreateCourseDto, UpdateCourseDto } from "../dtos/courses.dto";

export const courseController = {
  async createCourse(req: Request, res: Response) {
    const body = req.body as CreateCourseDto;
    try {
      const newCourse = await courseService.createCourse(body);
      res.status(201).json(newCourse);
      console.log("Course created successfully");
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(400).json({ error: (error as Error).message });
    }
  },

  async getAllCourses(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    try {
      const result = await courseService.getAllCourses(page, limit);
      res.json(result);
    } catch {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async searchCoursesByTitle(req: Request, res: Response) {
    const { title } = req.query;
    console.log("Searching courses with title:", title);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    if (!title || typeof title !== "string") {
      return res.status(400).json({ error: "Missing or invalid title parameter" });
    }

    try {
      const result = await courseService.searchCoursesByTitle(title, page, limit);
      res.json(result);
    } catch (error) {
      console.error("Error searchCoursesByTitle");
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getCourseById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const course = await courseService.getCourseById(id);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.status(200).json(course);
    } catch {
      res.status(500).json({ error: "Failed to fetch course" });
    }
  },

  async updateCourse(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const body = req.body as UpdateCourseDto;
      const updatedCourse = await courseService.updateCourse(id, body);
      res.status(200).json(updatedCourse);
    } catch (error) {
      console.error("Error updating course:", error);
      res.status(400).json({ error: (error as Error).message });
    }
  },

  async deleteCourse(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await courseService.deleteCourse(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting course:", error);
      res.status(400).json({ error: (error as Error).message });
    }
  },
};
