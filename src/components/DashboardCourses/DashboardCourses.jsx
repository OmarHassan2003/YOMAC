import { Link, useNavigate } from "react-router-dom";
import "./DashboardCourses.css";
import { useSelector } from "react-redux";
const DashboardCourses = ({ data }) => {
  const { token, user_id, role } = useSelector(state => state.Authorization);
  console.log(data);
  const navigate = useNavigate();
  const handleClick = (course) => {
    navigate(`/course/${course.courseid}`);
  };
  const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  };
  const handleNavigation = () => {
    const url = `http://localhost:5174?token=${token}&user_id=${user_id}&role=${role}&curr_course_id=${curr_course_id}`;
  
  // Navigate to the URL
  window.location.href = url;
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
            <p className="course_status">{curr.seenstatus}</p>
            <div className="course12-progress">
              <span>{Math.ceil(curr.progress.toFixed(2) * 100)}%</span>
              <div className="progress12-bar">
                <div
                  style={{
                    width: `${Math.ceil(curr.progress.toFixed(2) * 100)}%`,
                    height: "100%",
                    backgroundColor: "#28a745",
                  }}
                ></div>
              </div>
            </div>
            <div className="course12-rating">
              <span>⭐ {curr.rating}</span>
            </div>
            {curr.seenstatus === "private" ? (
              <Link
                to={`http://yomac-private-klli.vercel.app/private?token=${token}&user_id=${user_id}&role=${role}&curr_course_id=${curr.courseid}`}
                className="view12-course-link"
              >
                View Course
              </Link>
            ) : (
              <button
                className="view12-course-btn"
                onClick={() => {
                  handleClick(curr);
                }}
              >
                View Course
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default DashboardCourses;
