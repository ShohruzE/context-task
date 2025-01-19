import { useParams, NavLink } from "react-router";
import { useState, useEffect } from "react";
import Lessons from "../components/Lessons";
import Loading from "../Loading";
import { ArrowLeft } from "lucide-react";

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

export default function LessonsPage() {
  const { courseId, topicId } = useParams();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(false);

  console.log(courseId);
  console.log(topicId);

  useEffect(() => {
    const fetchTopicByCourseId = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/courses/${courseId}/${topicId}`
        );
        const data = await response.json();
        setTopic(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopicByCourseId();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto mt-16">
        <div className="space-y-2 mb-4">
          <NavLink
            to={`/courses/${courseId}`}
            className="inline-block text-blue-500 font-bold text-lg gap-1 hover:border-b hover:border-blue-500 hover:scale-105"
          >
            <div className="flex items-center gap-1">
              <ArrowLeft size={20} />
              <span>Back to Topics</span>
            </div>
          </NavLink>
          <div>
            <h1 className="text-2xl font-bold">Lessons</h1>
            <p className="">{}</p>
          </div>
        </div>
        {loading && <Loading />}
        <div className="flex flex-col justify-center items-center gap-8">
          {topic?.lessons && (
            <Lessons
              lessons={topic.lessons}
              courseId={courseId}
              topicId={topicId}
            />
          )}
        </div>
      </div>
    </div>
  );
}
