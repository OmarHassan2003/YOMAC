import { Link, useNavigate } from "react-router-dom";
import "./DashboardCourses.css";
const DashboardCourses = ({ data }) => {
  console.log(data);
  const navigate = useNavigate();
  const handleClick = (course) => {
    navigate(`/course/${course.courseid}`);
  };
  return (
    <div className="course12-container">
      <div className="course-header">
        <h2>My Courses</h2>
      </div>
      <div className="course12-List">
        {data.courses_progress.map((curr, index) => (
          <div className="course12-item" key={curr.courseid}>
            <div className="course12-info">
              <img src={curr.courseimage} alt={`${curr.title} image`} />
              <div className="course-details">
                <h3>{curr.title}</h3>
              </div>
            </div>
            <div className="course12-progress">
              <span>{curr.progress.toFixed(2)}%</span>
              <div className="progress12-bar">
                <div
                  style={{
                    width: `${curr.progress.toFixed(2)}%`,
                    height: "100%",
                    backgroundColor: "#28a745",
                  }}
                ></div>
              </div>
            </div>
            <div className="course12-rating">
              <span>⭐ 4.3</span>
            </div>
            <button
              className="view12-course-btn"
              onClick={() => handleClick(curr)}
            >
              View Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DashboardCourses;
