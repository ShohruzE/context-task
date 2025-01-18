import { NavLink } from "react-router";
import { motion } from "framer-motion";
import { Book, Users } from "lucide-react";

interface Topic {
  _id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

interface Lesson {
  _id: string;
  title: string;
  description: string;
  content: string;
}

export default function Topics({
  topics,
  courseId,
}: {
  topics: Topic[];
  courseId: string | undefined;
}) {
  console.log("Topics page course id:", courseId);

  return (
    <>
      {topics.map((topic: Topic, index: number) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * index }}
          className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100"
        >
          <NavLink
            to={`/courses/${courseId}/${topic._id}`}
            key={index}
            className="flex flex-col justify-between h-full"
          >
            <div className="flex flex-col grow mb-8">
              <h2 className="mb-2 text-xl font-bold">{topic.title}</h2>
              <p className="text-gray-700 text-md">{topic.description}</p>
            </div>
          </NavLink>
        </motion.div>
      ))}
    </>
  );
}
