import { Link, useNavigate } from "react-router-dom";
import "./InstructorCourses.css";
import { useDispatch } from "react-redux";
import { deleteCourseThenGet } from "../../RTK/Slices/StudentSlice";
const InstructorCourses = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (course) => {
    navigate(`/course/${course.courseid}`);
  };
  const handleWhiteClick = (course) => {
    navigate(`/whiteboard/${course.courseid}`);
  };
  const handleDelete = (course) => {
    dispatch(deleteCourseThenGet(course.courseid));
  };
  return (
    <>
      {data?.top_courses?.length > 0 && (
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
                    handleWhiteClick(curr);
                  }}
                >
                  Whiteboard
                </button>
                <button
                  className="view-course-btn"
                  onClick={() => {
                    handleClick(curr);
                  }}
                >
                  View
                </button>
                <button
                  className="delete-btn"
                  onClick={() => {
                    handleDelete(curr);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {data?.non_top_courses?.length > 0 && (
        <div className="course-container" style={{ marginTop: "20px" }}>
          <div className="course-header">
            <h2>Non Top Courses</h2>
          </div>
          <div className="course-List">
            {data?.non_top_courses?.map((curr, index) => (
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
      )}
    </>
  );
};
export default InstructorCourses;
