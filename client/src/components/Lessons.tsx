import { NavLink } from "react-router";
import { motion } from "framer-motion";

interface Lesson {
  _id: string;
  title: string;
  description: string;
  content: string;
}

export default function Lessons({
  lessons,
  courseId,
  topicId,
}: {
  lessons: Lesson[];
  courseId: string | undefined;
  topicId: string | undefined;
}) {
  return (
    <>
      {lessons.map((lesson: Lesson, index: number) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * index }}
          className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100"
        >
          <NavLink
            to={`/courses/${courseId}/${topicId}/${lesson._id}`}
            key={index}
            className="flex flex-col justify-between h-full"
          >
            <div className="flex flex-col grow mb-8">
              <h2 className="mb-2 text-xl font-bold">{lesson.title}</h2>
              <p className="text-gray-700 text-md">{lesson.description}</p>
            </div>
          </NavLink>
        </motion.div>
      ))}
    </>
  );
}
