import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router";
import { ArrowLeft } from "lucide-react";

import Loading from "../Loading";

interface Slide {
  title: string;
  bulletPoints: string[];
}

interface Lesson {
  _id: string;
  title: string;
  description: string;
  content: string;
}

export default function SlidesPage() {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(false);
  const { courseId, topicId, lessonId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/courses/${courseId}/${topicId}/${lessonId}`
        );
        const data = await response.json();
        setLesson(data);

        const slidesResponse = await fetch(
          `http://localhost:3000/courses/${courseId}/${topicId}/${lessonId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: data.content }),
          }
        );
        const slidesData = await slidesResponse.json();
        setSlides(slidesData.slides);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, topicId, lessonId]);

  const handleNextSlide = () => {
    if (currentSlide < slides.length) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto mt-16">
        <div className="space-y-2 mb-4">
          <NavLink
            to={`/courses/${courseId}/${topicId}`}
            className="inline-block text-blue-500 font-bold text-lg gap-1 hover:border-b hover:border-blue-500 hover:scale-105"
          >
            <div className="flex items-center gap-1">
              <ArrowLeft size={20} />
              <span>Back to Lessons</span>
            </div>
          </NavLink>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">{lesson?.title}</h1>
            <p className="text-lg text-gray-500 font-semibold">
              {lesson?.description}
            </p>
          </div>
        </div>
        <div className="">
          {loading && <Loading />}

          {slides && slides.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-8 p-6 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">
                  {slides[currentSlide]?.title}
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  {slides[currentSlide]?.bulletPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handlePrevSlide}
                  disabled={currentSlide === 0}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextSlide}
                  disabled={currentSlide === slides.length - 1}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
