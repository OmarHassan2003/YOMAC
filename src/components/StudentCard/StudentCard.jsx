import messi from "../../assets/3mk.jpg";
import "./StudentCard.css";

const StudentCard = ({ data }) => {
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
    </div>
  );
};

export default StudentCard;
