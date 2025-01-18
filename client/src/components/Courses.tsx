import { NavLink } from "react-router";
import { motion } from "framer-motion";
import { Book, Users } from "lucide-react";
interface Course {
  _id: string;
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

export default function Courses({ courses }: { courses: Course[] }) {
  return (
    <>
      {courses.map((course: Course, index: number) => {
        // console.log(course._id);

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100"
          >
            <NavLink
              to={`/courses/${course._id}`}
              key={index}
              className="flex flex-col justify-between h-full"
            >
              <div className="flex flex-col grow mb-8">
                <h2 className="mb-2 text-xl font-bold">{course.title}</h2>
                <p className="text-gray-700 text-md">{course.description}</p>
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="flex justify-center items-center gap-1 text-blue-500">
                  <Book size={20} />
                  <span className="font-bold">
                    {course.topics.length} topics
                  </span>
                </div>
                <div className="flex justify-center items-center gap-1 text-green-500">
                  <Users size={20} />
                  <span className="font-bold">
                    {course.topics.reduce(
                      (acc, topic) => acc + topic.lessons.length,
                      0
                    )}{" "}
                    lessons
                  </span>
                </div>
              </div>
            </NavLink>
          </motion.div>
        );
      })}
    </>
  );
}
