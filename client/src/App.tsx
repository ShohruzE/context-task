import { Routes, Route } from "react-router";

import Home from "./pages/Home";
import CreateCoursePage from "./pages/CreateCoursePage";
import CoursesPage from "./pages/CoursesPage";
import TopicsPage from "./pages/TopicsPage";
import LessonsPage from "./pages/LessonsPage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/create" index element={<CreateCoursePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:courseId" element={<TopicsPage />} />
        <Route path="/courses/:courseId/:topicId" element={<LessonsPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
