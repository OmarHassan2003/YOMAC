import "./App.css";
import Navbar from "./Navbar";
import HomePage from "./Homepage";
import Login from "./Login";
import Register from "./Register";
import { Routes, Route } from "react-router-dom";
import StudentLogin from "./StudentLogin";
import InstructorLogin from "./InstructorLogin";
import StudentRegister from "./StudentRegister";
import InstructorRegister from "./InstructorRegister";
import Course from "./Course";

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
      </Routes>
    </div>
  );
}

export default App;
