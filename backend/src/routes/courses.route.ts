import { Router } from "express";
import { courseController } from "../controller/courses.controller";

const courseRouter = Router();
courseRouter.get("/", (req, res) => courseController.getAllCourses(req, res));
export default courseRouter;
