import "./HomePage.css";
import girlImage from "../../assets/homepage-girl.png";
import fileInvoice from "../../assets/file-invoice-1.png";
import calendarImage from "../../assets/calendar2.png";
import usersImage from "../../assets/users1.png";
import forStudents from "../../assets/forstudents.png";
import forInstructors from "../../assets/forinstructors.png";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
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
          <Link to="/register">
            <button className="join-yomac-button">Join for free</button>
          </Link>
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
