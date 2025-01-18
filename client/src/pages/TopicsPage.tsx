import { useParams } from "react-router";
import { useState, useEffect } from "react";
import Topics from "../components/Topics";
import Loading from "../Loading";

export default function TopicsPage() {
  const { courseId } = useParams();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(courseId);

  useEffect(() => {
    const fetchTopicsByCourseId = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/courses/${courseId}`
        );
        const data = await response.json();
        setTopics(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopicsByCourseId();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-bold mb-4">Topics</h1>
        {loading && <Loading />}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {topics && <Topics topics={topics} courseId={courseId} />}
        </div>
      </div>
    </div>
  );
}
