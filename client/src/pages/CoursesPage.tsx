import { useState, useEffect } from "react";
import Courses from "../components/Courses";
import Loading from "../Loading";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/courses");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-bold mb-4">Your Courses</h1>
        {loading && <Loading />}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses && <Courses courses={courses} />}
        </div>
      </div>
    </div>
  );
}
