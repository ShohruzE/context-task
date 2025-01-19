import { useParams, NavLink } from "react-router";
import { useState, useEffect } from "react";
import Topics from "../components/Topics";
import Loading from "../Loading";
import { ArrowLeft } from "lucide-react";

interface Course {
  _id: string;
  title: string;
  description: string;
  topics: Topic[];
}

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

export default function TopicsPage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);

  console.log(courseId);

  useEffect(() => {
    const fetchCourseByCourseId = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/courses/${courseId}`
        );
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseByCourseId();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto mt-16">
        <div className="space-y-2 mb-4">
          <NavLink
            to="/courses"
            className="inline-block text-blue-500 font-bold text-lg gap-1 hover:border-b hover:border-blue-500 hover:scale-105"
          >
            <div className="flex items-center gap-1">
              <ArrowLeft size={20} />
              <span>Back to Courses</span>
            </div>
          </NavLink>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">{course?.title}</h1>
            <p className="text-lg text-gray-500 font-semibold">
              {course?.description}
            </p>
          </div>
        </div>
        {loading && <Loading />}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {course?.topics && (
            <Topics topics={course.topics} courseId={courseId} />
          )}
        </div>
      </div>
    </div>
  );
}
