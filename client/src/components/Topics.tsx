import { Link } from "react-router";
import { motion } from "framer-motion";
import { Book } from "lucide-react";

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
  return (
    <>
      {topics.map((topic: Topic, index: number) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * index }}
          className="block bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100"
        >
          <div key={index} className="flex flex-col justify-between h-full p-6">
            <div className="flex flex-col grow mb-8">
              <h2 className="mb-2 text-xl font-bold">{topic.title}</h2>
              <p className="text-gray-700 text-md">{topic.description}</p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center gap-1 text-green-500 font-bold">
                <Book size={16} />
                <span>{topic.lessons.length} lessons</span>
              </div>

              <div>
                <Link
                  to={`/courses/${courseId}/${topic._id}`}
                  className="bg-blue-500 py-2 px-4 rounded-sm text-white font-medium hover:bg-blue-500/80"
                >
                  Start Learning
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
}
