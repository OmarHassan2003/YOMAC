import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getStudent } from "../../RTK/Slices/StudentSlice";
import LearningTime from "../../components/LearningTime/LearningTime";
import DashboardCourses from "../../components/DashboardCourses/DashboardCourses";
import InstructorCourses from "../../components/InstructorCourses/InstructorCourses";
import "./DashBoard.css";

const DashBoard = () => {
  let data = useSelector((state) => state.student);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStudent());
  }, []);
  data = data.object;
  let isStudent = false;
  if (data.studentid != null) {
    isStudent = true;
  }

  return (
    <div className="dashboard">
      {isStudent ? (
        <div>
          <DashboardCourses data={data} />
          <LearningTime data={data} />
        </div>
      ) : (
        <div>
          <InstructorCourses data={data} />
          <Link to="/createCourse">
            <button className="view-course-btn">Create Course</button>
          </Link>
        </div>
      )}{" "}
    </div>
  );
};
export default DashBoard;
