import CreateCourseForm from "../components/CreateCourseForm";

export default function CreateCoursePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">Create a Course</h1>
      <div className="border border-gray-200 rounded-md py-8 px-4 shadow-lg w-full max-w-[500px]">
        <CreateCourseForm />
      </div>
    </div>
  );
}
