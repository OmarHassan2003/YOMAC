import "./App.css";
import StudentRegister from "./pages/StudentRegister";
import InstructorRegister from "./pages/InstructorRegister";
import Course from "./components/Course";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import StudentLogin from "./pages/StudentLogin";
import InstructorLogin from "./pages/InstructorLogin";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/instructorlogin" element={<InstructorLogin />} />
        <Route path="studentregister" element={<StudentRegister />} />
        <Route path="instructorregister" element={<InstructorRegister />} />
        <Route path="/course" element={<Course />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
