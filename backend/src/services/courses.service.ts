import {
  CourseResponseDto,
  CreateCourseDto,
  PaginatedCoursesResponseDto,
  UpdateCourseDto,
} from "../dtos/courses.dto";
import { CourseModel } from "../models/course.model";

export const courseService = {
  async createCourse(data: CreateCourseDto): Promise<CourseResponseDto> {
    const course = new CourseModel(data);
    await course.save();
    return course.toJSON() as CourseResponseDto;
  },

  async getAllCourses(page = 1, limit = 10): Promise<PaginatedCoursesResponseDto> {
    const skip = (page - 1) * limit;
    const [courses, totalItems] = await Promise.all([
      CourseModel.find().skip(skip).limit(limit).lean({ virtuals: true }),
      CourseModel.countDocuments(),
    ]);

    return {
      data: courses as CourseResponseDto[],
      totalPages: Math.ceil(totalItems / limit),
    };
  },

  async getCourseById(id: string): Promise<CourseResponseDto | null> {
    const course = await CourseModel.findById(id).lean({ virtuals: true });
    return course as CourseResponseDto | null;
  },

  async updateCourse(id: string, data: UpdateCourseDto): Promise<CourseResponseDto | null> {
    const course = await CourseModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean({ virtuals: true });
    return course as CourseResponseDto | null;
  },

  async deleteCourse(id: string): Promise<void> {
    await CourseModel.findByIdAndDelete(id);
  },
  async searchCoursesByTitle(
    title: string,
    page = 1,
    limit = 10,
  ): Promise<PaginatedCoursesResponseDto> {
    const skip = (page - 1) * limit;
    const query = { title: { $regex: title, $options: "i" } };

    const [courses, totalItems] = await Promise.all([
      CourseModel.find(query).skip(skip).limit(limit).lean({ virtuals: true }),
      CourseModel.countDocuments(query),
    ]);

    return {
      data: courses as CourseResponseDto[],
      totalPages: Math.ceil(totalItems / limit),
    };
  },
};
