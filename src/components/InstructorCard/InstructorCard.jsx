import messi from "../../assets/3mk.jpg";
import "./InstructorCard.css";

const InstructorCard = ({ data }) => {
  const obj = {
    img: messi,
    name: "Farag beh",
    about:
      "Be the last one out to get this dough? No way Love one of you bucket headed hoes? No way Hit the streets, then we break the code? No way Hit the brakes when they on patrol? No way ",
    level: 7,
    statusBadge: "gamed",
    courseInProgress: 10,
    coursesCompleted: 22,
    supports: ["football", "omar 5wl", "wafa 3rs"],
    contestsWon: 25,
  };
  console.log(data);
  const topCourses = data?.top_courses?.length;
  const nonTopCourses = data?.non_top_courses?.length;
  return (
    <div className="sidebar">
      <img src={data?.profilepic} className="profile-photo" />
      <div className="user-name">{data?.username}</div>
      <div className="stat">
        <div>
          <strong>{topCourses}</strong>
          <br />
          Top Courses
        </div>
        <div>
          <strong>{nonTopCourses}</strong>
          <br />
          Non Top Courses
        </div>
      </div>
      <h3>Top 3 Courses</h3>
      <ul className="support-list">
        {data?.top_courses?.map((curr, index) =>
          index < 3 ? <li key={index}>{curr.title}</li> : ""
        )}
      </ul>
    </div>
  );
};

export default InstructorCard;
