import { CourseResponseDto } from "../dtos/courses.dto";
import { CourseModel } from "../models/course.model";

export const courseService = {
  async getAllCourses(): Promise<CourseResponseDto[]> {
    const courses = await CourseModel.find();
    return courses.map((course) => course.toJSON() as CourseResponseDto);
  },
};
