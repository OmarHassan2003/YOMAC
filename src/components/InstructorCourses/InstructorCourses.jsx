import { Link, useNavigate } from "react-router-dom";
import "./InstructorCourses.css";
const InstructorCourses = ({ data }) => {
  const navigate = useNavigate();
  const handleClick = (course) => {
    navigate(`/course/${course.courseid}`);
  };
  return (
    <div className="course-container">
      <div className="course-header">
        <h2>Top Courses</h2>
      </div>
      <div className="course-List">
        {data?.top_courses?.map((curr, index) => (
          <div className="course-item" key={index}>
            <div className="course-info">
              <img src={curr.courseimage} />
              <div className="course-details">
                <h3>{curr.title}</h3>
              </div>
            </div>
            <div>{Math.ceil(curr.duration / 3600)}</div>
            <div className="course-rating">
              <span>⭐ 4.3</span>
            </div>
            <button
              className="view-course-btn"
              onClick={() => {
                handleClick(curr);
              }}
            >
              View Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default InstructorCourses;
