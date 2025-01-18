import { Link } from "react-router";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="text-center my-16">
        <h1 className="text-4xl font-bold mb-4">AI-powered Courses</h1>
        <p className="text-xl mb-8">
          Learn anything you want with our AI-powered course generator!
        </p>
        <div className="space-x-4">
          <Link
            to="/courses"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            View Courses
          </Link>
          <Link
            to="/create"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Create a Course
          </Link>
        </div>
      </div>
    </div>
  );
}
