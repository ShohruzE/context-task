import express from "express";
import {
  getCourses,
  getCourseByCourseId,
  getTopicByCourseId,
  createCourse,
} from "../controllers/courses.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/:courseId", getCourseByCourseId);
router.get("/:courseId/:topicId", getTopicByCourseId);
router.post("/create", createCourse);

export default router;
