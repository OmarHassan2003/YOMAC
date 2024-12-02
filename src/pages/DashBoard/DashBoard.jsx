import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudent } from "../../RTK/Slices/StudentSlice";
import LearningTime from "../../components/LearningTime/LearningTime";
import DashboardCourses from "../../components/DashboardCourses/DashboardCourses";
import "./DashBoard.css";

const DashBoard = () => {
  const data = useSelector((state) => state.student);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStudent(1));
  }, []);
  console.log(data);
  const totalTime = parseFloat(data.learning_time).toFixed(0);
  const hours = totalTime / 3600;
  const mins = (hours % 1) * 60;

  return (
    <div className="dashboard">
      <LearningTime hours={hours} mins={mins} />
      <DashboardCourses data={data} />
    </div>
  );
};
export default DashBoard;
