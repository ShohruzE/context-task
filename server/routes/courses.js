import express from "express";
import {
  getCourses,
  getCourseByCourseId,
  getTopicByCourseId,
  getLessonByIds,
  createCourse,
  createLesson,
} from "../controllers/courses.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/:courseId", getCourseByCourseId);
router.get("/:courseId/:topicId", getTopicByCourseId);
router.get("/:courseId/:topicId/:lessonId", getLessonByIds);

router.post("/create", createCourse);
router.post("/:courseId/:topicId/:lessonId", createLesson);

export default router;
