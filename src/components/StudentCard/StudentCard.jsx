import { useRef, useState } from "react";
import messi from "../../assets/3mk.jpg";
import "./StudentCard.css";
import { useDispatch } from "react-redux";
import { getStudent, increaseBalance, increaseThenGet, newIncreaseBalance } from "../../RTK/Slices/StudentSlice";

const StudentCard = ({ data }) => {
  const dispatch = useDispatch();

  const IncreaseBalanceInp = useRef(null);

  const handleIncreaseBalance = () => {
    console.log(IncreaseBalanceInp.current.value);
    
    dispatch(increaseThenGet(IncreaseBalanceInp.current.value));
  };
  const obj = {
    img: messi,
    name: "Farag beh",
    about:
      "Be the last one out to get this dough? No way Love one of you bucket headed hoes? No way Hit the streets, then we break the code? No way Hit the brakes when they on patrol? No way ",
    level: 7,
    statusBadge: "gamed",
    courseInProgress: 10,
    coursesCompleted: 22,
    contestsWon: 25,
  };
  console.log(data);

  let coursesCompleted = 0;
  let courseInProgress = 0;
  data?.courses_progress?.map((curr) =>
    curr.progress === 100 ? coursesCompleted++ : courseInProgress++
  );

  // Extract first two courses
  const firstTwoCourses = data?.courses_progress?.slice(0, 2) || [];

  return (
    <div className="sidebar">
      <img src={data.profilepic} className="profile-photo" />
      <div className="user-name">{data.studentname}</div>
      <div className="status-badge">{data.username}</div>
      <div className="stat">
        <div>
          <strong>{courseInProgress}</strong>
          <br />
          Courses in Progress
        </div>
        <div>
          <strong>{coursesCompleted}</strong>
          <br />
          Courses Completed
        </div>
      </div>
      <h3 className="h3">Balance</h3>
      <p className="balance">{data?.balance || 0}</p>
      <h3 className="h3">Courses</h3>
      <ul className="course-list">
        {firstTwoCourses.map((course, index) => (
          <li key={index}>
            <strong>{course.title}</strong>: {course.description}
          </li>
        ))}
      </ul>
      <form onSubmit={(e) => {
        handleIncreaseBalance();   
        e.preventDefault();     
      }} className="balance-form">
        <p style={{ marginTop: "20px", marginBottom: "20px" }}>Increase Your Balance</p>
        <label
          style={{ marginRight: "10px", marginBottom: "15px" }}
          htmlFor="amount"
        >
          Enter Amount:
        </label>
        <input
          ref={IncreaseBalanceInp}
          type="number"
          placeholder={data?.balance || 0}
          min={data?.balance || 0}
          style={{ padding: "5px" }}
        />
          <button className="purchase">
            Add Balance
          </button>
      </form>
    </div>
  );
};

export default StudentCard;
