import "./App.css";
import StudentRegister from "./pages/StudentRegister/StudentRegister.jsx";
import InstructorRegister from "./pages/InstructorRegister/InstructorRegister.jsx";
import Course from "./components/Course";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar/Navbar.jsx";
import HomePage from "./pages/Homepage/Homepage.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import { Routes, Route } from "react-router-dom";
import StudentLogin from "./pages/StudentLogin/StudentLogin.jsx";
import InstructorLogin from "./pages/InstructorLogin/InstructorLogin.jsx";
import { useDispatch } from "react-redux";
import { StudentLoginAPI } from "./RTK/Slices/AuthorizationSlice";

function App() {
  const dispatch = useDispatch();
  dispatch(StudentLoginAPI());
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
