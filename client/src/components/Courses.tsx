import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { motion } from "framer-motion";

interface Course {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
}

interface Topic {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
}

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/courses");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Courses</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course: Course, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100"
          >
            <NavLink to={`/courses/${course.id}`} key={course.id}>
              <h2 className="mb-2 text-xl font-bold">{course.title}</h2>
              <p className="text-gray-700 text-md">{course.description}</p>
            </NavLink>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
