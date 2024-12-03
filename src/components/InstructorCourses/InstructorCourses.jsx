import { Link } from "react-router-dom";
import "./InstructorCourses.css";
const InstructorCourses = ({ data }) => {
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
            <Link to="/course">
              <button className="view-course-btn">View Course</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default InstructorCourses;
