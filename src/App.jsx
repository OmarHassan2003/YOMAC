import "./App.css";
import StudentRegister from "./pages/StudentRegister/StudentRegister.jsx";
import InstructorRegister from "./pages/InstructorRegister/InstructorRegister.jsx";
import Course from "./components/Course/Course";
import Profile from "./pages/Profile/Profile.jsx";
import DashBoard from "./pages/DashBoard/DashBoard.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import HomePage from "./pages/Homepage/Homepage.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Whiteboard from "./pages/Whiteboard/Whiteboard.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import StudentLogin from "./pages/StudentLogin/StudentLogin.jsx";
import InstructorLogin from "./pages/InstructorLogin/InstructorLogin.jsx";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx";
import CreateCourse from "./pages/CreateCourse/CreateCourse.jsx";
import { useDispatch, useSelector } from "react-redux";
import { StudentLoginAPI } from "./RTK/Slices/AuthorizationSlice";
import { useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.jsx";
import Quiz from "./components/Quiz/Quiz.jsx";
import LiveQA from "./pages/LiveQA/LiveQA.jsx";

function App() {
  // const dispatch = useDispatch();
  // dispatch(StudentLoginAPI());
  const { token } = useSelector((state) => state.Authorization);
  const navigate = useNavigate();
  useEffect(() => {
    if (token === null) navigate("/login");
  }, [token]);
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/liveqa" element={<LiveQA />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/instructorlogin" element={<InstructorLogin />} />
        <Route path="studentregister" element={<StudentRegister />} />
        <Route path="instructorregister" element={<InstructorRegister />} />
        <Route path="/course/:courseid" element={<Course />} />
        <Route path="/course/:courseid/quiz/:quizexamid" element={<Quiz />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/whiteboard" element={<Whiteboard />} />
        <Route path="/createCourse" element={<CreateCourse />} />
      </Routes>
    </>
  );
}

export default App;
