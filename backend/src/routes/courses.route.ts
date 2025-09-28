import { Router } from "express";
import { courseController } from "../controller/courses.controller";
import { validate } from "../middleware/validation.middleware";
import { createCourseSchema, updateCourseSchema } from "../dtos/courses.dto";

const courseRouter = Router();

courseRouter.get("/", (req, res) => courseController.getAllCourses(req, res));
courseRouter.get("/:id", (req, res) => courseController.getCourseById(req, res));
// courseRouter.get("/search/:title", courseController.searchCoursesByTitle);

courseRouter.post("/", validate(createCourseSchema), (req, res) =>
  courseController.createCourse(req, res),
);
courseRouter.put("/:id", validate(updateCourseSchema), (req, res) =>
  courseController.updateCourse(req, res),
);
courseRouter.delete("/:id", (req, res) => courseController.deleteCourse(req, res));
courseRouter.get("/search", (req, res) => courseController.searchCoursesByTitle(req, res));

export default courseRouter;
