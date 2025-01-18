import Courses from "./components/Courses";
import Home from "./Home";
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" index element={<Home />} />
      <Route path="courses" element={<Courses />} />
    </Routes>
  );
}

export default App;
