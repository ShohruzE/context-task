import express from "express";
import {
  getCourses,
  getTopicsByCourseId,
  getLessonsByTopicId,
  createCourse,
} from "../controllers/courses.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/:courseId", getTopicsByCourseId);
router.get("/:courseId/:topicId", getLessonsByTopicId);
router.post("/create", createCourse);

export default router;
