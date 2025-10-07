import { FilterQuery } from "mongoose";
import {
  CourseResponseDto,
  CreateCourseDto,
  FilterCriteria,
  GetAllCategoriesResponseDto,
  PaginatedCoursesResponseDto,
  UpdateCourseDto,
} from "../dtos/courses.dto";
import { CourseModel, ICourse } from "../models/course.model";

export const courseService = {
  async createCourse(data: CreateCourseDto): Promise<CourseResponseDto> {
    const course = new CourseModel(data);
    await course.save();
    return course.toJSON() as CourseResponseDto;
  },

  async getAllCourses(): Promise<CourseResponseDto[]> {
    const courses = await CourseModel.find();
    return courses.map((course) => course as CourseResponseDto);
  },

  async getCourseById(id: string): Promise<CourseResponseDto | null> {
    const course = await CourseModel.findById(id);
    console.log("Fetched course:", course);
    return course ? (course.toJSON() as CourseResponseDto) : null;
  },

  async updateCourse(id: string, data: UpdateCourseDto): Promise<CourseResponseDto | null> {
    const course = await CourseModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    return course ? (course.toJSON() as CourseResponseDto) : null;
  },

  async deleteCourse(id: string): Promise<CourseResponseDto | null> {
    const deletedCourse = await CourseModel.findByIdAndDelete(id);
    return deletedCourse ? (deletedCourse.toJSON() as CourseResponseDto) : null;
  },
  async searchCoursesByTitle(
    title: string,
    page = 1,
    limit = 10,
  ): Promise<PaginatedCoursesResponseDto> {
    const skip = (page - 1) * limit;
    const query = { title: { $regex: title, $options: "i" } };

    const [courses, totalItems] = await Promise.all([
      CourseModel.find(query).skip(skip).limit(limit),
      CourseModel.countDocuments(query),
    ]);

    return {
      data: courses.map((course) => course.toJSON() as CourseResponseDto),
      totalPages: Math.ceil(totalItems / limit),
    };
  },
  async getAllCategories(): Promise<GetAllCategoriesResponseDto> {
    const categories = await CourseModel.distinct("category");
    return { data: categories };
  },
  async filterCoursesByCriteria(
    criteria: FilterCriteria,
    page = 1,
    limit = 10,
  ): Promise<PaginatedCoursesResponseDto> {
    const skip = (page - 1) * limit;

    const andConditions: FilterQuery<ICourse>[] = [];

    if (criteria.title && criteria.title.trim() !== "") {
      andConditions.push({
        title: { $regex: criteria.title, $options: "i" },
      });
    }

    if (criteria.category && criteria.category.trim() !== "") {
      andConditions.push({
        category: { $regex: criteria.category, $options: "i" },
      });
    }

    const query = andConditions.length > 0 ? { $and: andConditions } : {};

    const [courses, totalItems] = await Promise.all([
      CourseModel.find(query).skip(skip).limit(limit),
      CourseModel.countDocuments(query),
    ]);

    return {
      data: courses.map((course) => course.toJSON() as CourseResponseDto),
      totalPages: Math.ceil(totalItems / limit),
    };
  },
};
