import { Link, useNavigate } from "react-router-dom";
import "./InstructorCourses.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourseThenGet } from "../../RTK/Slices/StudentSlice";
const InstructorCourses = ({ data }) => {
  const { token, user_id, role } = useSelector((state) => state.Authorization);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (course) => {
    if (course.seenstatus === "private") {
      const url = `http://yomac-private-klli.vercel.app/private?token=${token}&user_id=${user_id}&role=${role}&curr_course_id=${course.courseid}`;
      window.location.href = url;
    } else navigate(`/course/${course.courseid}`);
  };
  const handleWhiteClick = (course) => {
    navigate(`/whiteboard/${course.courseid}`);
  };
  const handleDelete = (course) => {
    dispatch(deleteCourseThenGet(course.courseid));
  };
  const handleStatClick = (course) => {
    navigate(`/courseStat/${course.courseid}`);
  };
  return (
    <>
      {data?.top_courses?.length > 0 && (
        <div className="course23-container">
          <div className="course23-header">
            <h2>Top Courses</h2>
          </div>
          <div className="course23-List">
            {data?.top_courses?.map((curr, index) => (
              <div className="course23-item" key={index}>
                <div className="course23-info">
                  <img src={curr.courseimage} />
                  <div className="course23-details">
                    <h3>{curr.title}</h3>
                  </div>
                </div>
                <div>{Math.ceil(curr.duration / 3600)}</div>
                <div className="course23-rating">
                  <span>⭐ {curr.rating}</span>
                </div>
                <div>
                  <button
                    className="view23-btn"
                    onClick={() => {
                      handleWhiteClick(curr);
                    }}
                  >
                    Whiteboard
                  </button>
                  <button
                    className="view23-btn"
                    onClick={() => {
                      handleStatClick(curr);
                    }}
                  >
                    Stats
                  </button>
                  <button
                    className="view23-btn"
                    onClick={() => {
                      handleClick(curr);
                    }}
                  >
                    View
                  </button>
                  <button
                    className="delete23-btn"
                    onClick={() => {
                      handleDelete(curr);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {data?.non_top_courses?.length > 0 && (
        <div className="course23-container" style={{ marginTop: "20px" }}>
          <div className="course23-header">
            <h2>Non Top Courses</h2>
          </div>
          <div className="course23-List">
            {data?.non_top_courses?.map((curr, index) => (
              <div className="course23-item" key={index}>
                <div className="course23-info">
                  <img src={curr.courseimage} />
                  <div className="course23-details">
                    <h3>{curr.title}</h3>
                  </div>
                </div>
                <div>{Math.ceil(curr.duration / 3600)}</div>
                <div className="course23-rating">
                  <span>⭐ {curr.rating}</span>
                </div>
                <button
                  className="view23-btn"
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
