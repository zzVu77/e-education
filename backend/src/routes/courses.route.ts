import { Router } from "express";
import { courseController } from "../controller/courses.controller";
import { createCourseSchema, updateCourseSchema } from "../dtos/courses.dto";
import { validate } from "../middleware/validation.middleware";
import { authenticate, isAdmin } from "../middleware/auth.middleware";

const courseRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course management
 */

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses (with pagination)
 *     tags: [Courses]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: List of courses
 */
courseRouter.get("/", (req, res) => courseController.getAllCourses(req, res));

/**
 * @swagger
 * /api/courses/search:
 *   get:
 *     summary: Search courses by title
 *     tags: [Courses]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *           example: React
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Search results
 */
courseRouter.get("/search", (req, res) => courseController.searchCoursesByTitle(req, res));
/**
 * @swagger
 * /api/courses/filter:
 *   get:
 *     summary: Filter courses by criteria
 *     tags: [Courses]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *           example: React
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           example: Web Development
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Filtered results
 */
courseRouter.get("/filter", (req, res) => courseController.filterCoursesByCriteria(req, res));

/**
 * @swagger
 * /api/courses/categories:
 *   get:
 *     summary: Get all course categories
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 */
courseRouter.get("/categories", (req, res) => courseController.getAllCategories(req, res));

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A course
 *       404:
 *         description: Course not found
 */

courseRouter.get("/:id", (req, res) => courseController.getCourseById(req, res));

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: React for Beginners
 *               description:
 *                 type: string
 *                 example: Learn React step by step
 *               price:
 *                 type: number
 *                 example: 99.99
 *               category:
 *                 type: string
 *                 example: Web Development
 *               level:
 *                 type: string
 *                 enum: [Beginner, Intermediate, Advanced]
 *               instructor:
 *                 type: string
 *                 example: John Doe
 *               duration:
 *                 type: number
 *                 example: 10
 *               imgUrl:
 *                 type: string
 *                 example: https://example.com/image.png
 *     responses:
 *       201:
 *         description: Course created
 */
courseRouter.post("/", authenticate, isAdmin, validate(createCourseSchema), (req, res) =>
  courseController.createCourse(req, res),
);

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Update a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Partial update allowed
 *     responses:
 *       200:
 *         description: Course updated
 *       404:
 *         description: Course not found
 */
courseRouter.put("/:id", authenticate, isAdmin, validate(updateCourseSchema), (req, res) =>
  courseController.updateCourse(req, res),
);

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Delete a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Course deleted
 *       404:
 *         description: Course not found
 */
courseRouter.delete("/:id", authenticate, isAdmin, (req, res) =>
  courseController.deleteCourse(req, res),
);

export default courseRouter;
