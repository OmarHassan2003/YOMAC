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
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
import Assignment from "./components/Assignment/Assignment.jsx";
import AddAssignment from "./components/AddAssignment/AddAssignment.jsx";
import Search from "./pages/Search/Search.jsx";
import CourseStat from "./pages/CourseStat/CourseStat.jsx";
import EditAssignment from "./components/EditAssignment/EditAssignment.jsx";
import { getCategories } from "./RTK/Slices/CategorySlice.js";
import Contest from "./components/Contest/Contest.jsx";
import Purchase from "./pages/Purchase/Purchase.jsx";
import Stats from "./pages/Stats/Stats.jsx";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.Authorization);
  const { categories } = useSelector((state) => state.category);
  const location = useLocation();
  const queryString = location.search.slice(1);
  const navigate = useNavigate();
  useEffect(() => {
    if (!queryString && token === null) navigate("/login");
    else if (
      token !== null &&
      (location.pathname === "/studentLogin" ||
        location.pathname === "/instructorlogin")
    ) {
      navigate("/");
    }
  }, [token]);
  useEffect(() => {
    dispatch(getCategories());
  }, [token]);
  return (
    <>
      <LoadingScreen />
      <Navbar categories={categories} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resetpassword" element={<ForgotPassword />} />
        <Route path="/liveqa/:courseID" element={<LiveQA />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/instructorlogin" element={<InstructorLogin />} />
        <Route path="studentregister" element={<StudentRegister />} />
        <Route path="instructorregister" element={<InstructorRegister />} />
        <Route path="search/:type/:searchQuery" element={<Search />} />
        <Route path="purchase" element={<Purchase />} />
        <Route
          path="course/:courseid/contest/:contestid/:roleindex"
          element={<Contest />}
        />
        <Route
          path="course/:courseid/sec/:secid/editAssign/:assignid"
          element={<EditAssignment />}
        />
        <Route
          path="course/:courseid/sec/:secid/addAssign"
          element={<AddAssignment />}
        />
        <Route
          path="course/:courseid/sec/:secid/assign/:assignid"
          element={<Assignment />}
        />
        <Route
          path="/course/:courseid/quiz/:quizexamid/:roleindex"
          element={<Quiz />}
        />
        <Route path="/course/:courseid" element={<Course />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/whiteboard/:courseid" element={<Whiteboard />} />
        <Route path="/courseStat/:courseid" element={<CourseStat />} />
        <Route path="/createCourse" element={<CreateCourse />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </>
  );
}

export default App;
