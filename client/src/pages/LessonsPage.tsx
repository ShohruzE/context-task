import { useParams } from "react-router";
import { useState, useEffect } from "react";
import Lessons from "../components/Lessons";
import Loading from "../Loading";

export default function LessonsPage() {
  const { courseId, topicId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(courseId);
  console.log(topicId);

  useEffect(() => {
    const fetchLessonsByTopicId = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/courses/${courseId}/${topicId}`
        );
        const data = await response.json();
        setLessons(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLessonsByTopicId();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-bold mb-4">Lessons</h1>
        {loading && <Loading />}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {lessons && (
            <Lessons lessons={lessons} courseId={courseId} topicId={topicId} />
          )}
        </div>
      </div>
    </div>
  );
}
