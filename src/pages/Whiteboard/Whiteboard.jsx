import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptRequest,
  acceptRequestThenGet,
  getWhiteboard,
  rejectRequest,
  rejectRequestThenGet,
} from "../../RTK/Slices/WhiteboardSlice";
import "./Whiteboard.css";
import { useParams } from "react-router-dom";

const WhiteBoard = () => {
  const params = useParams();
  const currCourseID = params.courseid;
  const data = useSelector((state) => state.whiteBoard);
  const dispatch = useDispatch(currCourseID);
  useEffect(() => {
    dispatch(getWhiteboard(currCourseID));
  }, []);
  const whiteboard = data.whiteboard;
  console.log(whiteboard);
  const acceptRequest2 = (instructorWhiteboardId, courseId) => {
    console.log(instructorWhiteboardId, courseId);
    const request = {
      course_id: courseId,
      item_id: instructorWhiteboardId,
    };
    dispatch(acceptRequestThenGet(request));
  };
  const rejectRequest2 = (instructorWhiteboardId, courseId) => {
    console.log(instructorWhiteboardId, courseId);
    const request = {
      course_id: courseId,
      item_id: instructorWhiteboardId,
    };
    dispatch(rejectRequestThenGet(request));
  };
  return (
    <div className="course-container">
      <div className="course-header">
        <h2>Requests</h2>
      </div>
      <div className="course-List">
        {whiteboard?.map((curr, index) => (
          <div className="course-item" key={index}>
            <div className="course-info">
              <img src={curr.instructor.profilepic} />
              <h3 style={{ marginRight: "400px" }}>
                {curr.instructor.instructorname}
              </h3>
              <div className="course-details">
                <h3>
                  {curr.quiz
                    ? "quiz"
                    : curr.contestexamid
                    ? "Contest"
                    : "Assignment"}
                </h3>
              </div>
            </div>
            <div>
              <button
                className="view-course-btn"
                onClick={() => {
                  acceptRequest2(curr.instructorwhiteboardid, curr.courseid);
                }}
                style={{ marginRight: "10px" }}
              >
                Accept
              </button>
              <button
                className="reject-btn"
                onClick={() => {
                  rejectRequest2(curr.instructorwhiteboardid, curr.courseid);
                }}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default WhiteBoard;
