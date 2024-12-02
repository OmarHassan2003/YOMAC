import { Link } from "react-router-dom";
import "./DashboardCourses.css";
const DashboardCourses = ({ data }) => {
  return (
    <div className="course-container">
      <div className="course-header">
        <h2>My Courses</h2>
      </div>
      <div className="course-List">
        {data.courses_progress.map((curr, index) => (
          <div className="course-item" key={index}>
            <div className="course-info">
              <img src={curr.courseimage} />
              <div className="course-details">
                <h3>{curr.title}</h3>
              </div>
            </div>
            <div className="course-progress">
              <span>{curr.progress.toFixed(2)}%</span>
              <div className="progress-bar">
                <div
                  style={{
                    width: `${curr.progress.toFixed(2)}%`,
                    height: "100%",
                    backgroundColor: "#28a745",
                  }}
                ></div>
              </div>
            </div>
            <div className="course-rating">
              <span>⭐ 4.3</span>
            </div>
            <Link to="/course">
              <button className="view-course-btn">View Course</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DashboardCourses;
