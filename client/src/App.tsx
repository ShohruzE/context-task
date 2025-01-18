import CreateCourseForm from "./components/CreateCourseForm";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">Create a Course</h1>
      <CreateCourseForm />
    </div>
  );
}

export default App;
