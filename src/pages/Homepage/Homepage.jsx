import "./Homepage.css";
import girlImage from "../../assets/homepage-girl.png";
import fileInvoice from "../../assets/file-invoice-1.png";
import calendarImage from "../../assets/calendar2.png";
import usersImage from "../../assets/users1.png";
import forStudents from "../../assets/forstudents.png";
import forInstructors from "../../assets/forinstructors.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "../../RTK/Slices/CourseSlice";
import { getStudent } from "../../RTK/Slices/StudentSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  let userData = useSelector((state) => state.student);
  const data = useSelector((state) => state.Authorization);
  const isLoggedIn = data.token !== null;
  const navigate = useNavigate();
  const isStudent = data.role === "student";
  useEffect(() => {
    dispatch(getStudent());
  }, []);
  console.log(userData, isStudent);
  userData = userData.object;
  const handleJoinButton = () => {
    const aboutSection = document.querySelector(".about");
    aboutSection.scrollIntoView({ behavior: "smooth" });
  };
  const handleNavigateToDashboard = () => {
    navigate("/dashboard");
  };

  const handleNavigateToCourse = (e, courseid) => {
    navigate(`/course/${courseid}`);
  };
  return isLoggedIn ? (
    isStudent ? (
      <div className="homepage-logged-in">
        <h1 style={{ marginTop: "20px" }}>
          Welcome Back, {userData.studentname}
        </h1>
        <div className="instructor-courses">
          <h2 style={{ marginTop: "20px" }}>My Courses</h2>
          <ul className="homepage-courses-list">
            {userData.courses_progress &&
            userData.courses_progress.length > 0 ? (
              userData.courses_progress.map((course, index) => (
                <li key={index} className="homepage-course-card">
                  <img src={course.courseimage} alt={`${course.title} image`} />
                  <div className="search-course-details">
                    <h3 style={{ fontSize: "20px" }} className="course-title">
                      {course.title}
                    </h3>
                    <p className="course-description">{course.description}</p>
                    <p className="course-duration">
                      {course.duration} total hours
                    </p>
                    <p className="course-duration">
                      {course.progress * 100}% complete
                    </p>
                    <p className="course-rating">⭐ {course.rating}</p>
                    <button
                      className="purchase"
                      onClick={(e) =>
                        handleNavigateToCourse(e, course.courseid)
                      }
                    >
                      Go to course
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p>You don't have any courses purchased.</p>
            )}
          </ul>
        </div>
      </div>
    ) : (
      <div className="homepage-logged-in">
        <h1 style={{ marginTop: "20px" }}>
          Welcome Back, {userData.instructorname}
        </h1>
        <div className="instructor-courses">
          <h2 style={{ marginTop: "20px" }}>My Courses</h2>
          <ul className="homepage-courses-list">
            {userData.top_courses && userData.top_courses.length > 0 ? (
              userData.top_courses.map((course, index) => (
                <li key={index} className="homepage-course-card">
                  <img src={course.courseimage} alt={`${course.title} image`} />
                  <div className="search-course-details">
                    <h3 style={{ fontSize: "20px" }} className="course-title">
                      {course.title}
                    </h3>
                    <p className="course-description">{course.description}</p>
                    <p className="course-duration">
                      {course.duration} total hours
                    </p>
                    <p className="course-rating">⭐ {course.rating}</p>
                    <button
                      className="purchase"
                      onClick={handleNavigateToDashboard}
                    >
                      Go to courses
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p>No courses available.</p>
            )}
          </ul>
        </div>
        <div className="home-forgot-container">
          <h1>or</h1>
          <Link to="/createCourse">Create a new course</Link>
        </div>
      </div>
    )
  ) : (
    <div className="homepage">
      <div className="first-page">
        <div className="text-content">
          <h1>
            <span className="highlighted">Studying and Teaching</span> Online
            are now so much easier
          </h1>
          <h2>
            YOMAC is an interesting platform that will provide more interactive
            ways to learn for students and to teach for educators.
          </h2>

          <button className="join-yomac-button" onClick={handleJoinButton}>
            Join for free
          </button>
        </div>
        <div className="image-container">
          <img src={girlImage} alt="Girl holding books" />
        </div>
      </div>

      <header className="header">
        <h1>
          <span className="base-color">All-In-One</span>{" "}
          <span className="highlight">Cloud Software.</span>
        </h1>
        <p>
          YOMAC is one powerful online software suite that combines all the
          tools needed to run a successful school or office.
        </p>
      </header>

      <section className="features">
        <div className="feature">
          <div className="icon-placeholder1">
            <img src={fileInvoice} alt="" />
          </div>
          <h3 className="base-color">Online Billing, Invoicing, & Contracts</h3>
          <p>
            Simple and secure control of your organization’s financial and legal
            transactions. Send customized invoices and contracts.
          </p>
        </div>
        <div className="feature">
          <div className="icon-placeholder2">
            <img src={calendarImage} alt="" />
          </div>
          <h3 className="base-color">Easy Scheduling & Attendance Tracking</h3>
          <p>
            Schedule and reserve classrooms at one campus or multiple campuses.
            Keep detailed records of student attendance.
          </p>
        </div>
        <div className="feature">
          <div className="icon-placeholder3">
            <img src={usersImage} alt="" />
          </div>
          <h3 className="base-color">Customer Tracking</h3>
          <p>
            Automate and track needs of individuals or groups. Skilline's
            built-in system helps organize your organization.
          </p>
        </div>
      </section>

      <section className="about">
        <h1>
          <span className="base-color">What is</span>{" "}
          <span className="highlight">YOMAC?</span>
        </h1>
        <p style={{ padding: "0px 30%", marginBottom: "65px" }}>
          YOMAC is a platform that allows educators to create online courses
          whereby they can store the course materials online; manage
          assignments, quizzes and exams; monitor due dates; grade results and
          provide students with feedback all in one place.
        </p>
        <div className="cards">
          <div className="card">
            <img src={forInstructors} alt="" />
            <h3>FOR INSTRUCTORS</h3>
            <Link to="/instructorregister">
              <button className="register-homepage1">
                Register as an Instructor!
              </button>
            </Link>
          </div>
          <div className="card">
            <img src={forStudents} alt="" />
            <h3>FOR STUDENTS</h3>
            <Link to="/studentregister">
              <button className="register-homepage1">
                Register as a Student!
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="classroom">
        <h2>
          <span className="base-color">
            Everything you can do in a physical classroom,
          </span>{" "}
          <span className="highlight">you can do with YOMAC</span>
        </h2>
        <p>
          YOMAC school management software helps traditional and online schools
          manage scheduling, attendance, payments and virtual classrooms all in
          one secure system.
        </p>
      </section>
    </div>
  );
}
