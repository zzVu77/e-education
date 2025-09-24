import { Router } from "express";
import { courseController } from "../controller/courses.controller";

const courseRouter = Router();
courseRouter.get("/", courseController.getAllCourses);
export default courseRouter;
