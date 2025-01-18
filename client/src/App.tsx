import CoursesPage from "./pages/CoursesPage";
import Home from "./pages/Home";
import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CreateCoursePage from "./pages/CreateCoursePage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="/create" index element={<CreateCoursePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
