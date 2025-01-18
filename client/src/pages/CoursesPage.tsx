import { Suspense, useState, useEffect } from "react";
import Courses from "../components/Courses";

export default function CoursesPage() {
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
    <div className="min-h-screen">
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-bold mb-4">Your Courses</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Suspense fallback={<Loading />}>
            <Courses courses={courses} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <>
      <p>Loading...</p>
    </>
  );
}
