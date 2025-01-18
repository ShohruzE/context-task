import express from "express";
import { getCourses, createCourse } from "../controllers/courses.js";

const router = express.Router();

router.get("/", getCourses);
router.post("/create", createCourse);

export default router;
