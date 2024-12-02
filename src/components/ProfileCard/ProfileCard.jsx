import messi from "../../assets/3mk.jpg";
import "./ProfileCard.css";

const PorfileCard = ({ data }) => {
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
  let coursesCompleted = 0;
  let courseInProgress = 0;
  data.courses_progress.map((curr) =>
    curr.progress === 100 ? coursesCompleted++ : courseInProgress++
  );
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
        {obj.contestsWon !== 0 ? (
          <div>
            <strong>{obj.contestsWon}</strong>
            <br />
            Constests Won
          </div>
        ) : (
          ""
        )}
      </div>
      <h3>Support</h3>
      <ul className="support-list">
        {obj.supports.map((curr, index) => (
          <li key={index}>{curr}</li>
        ))}
      </ul>
    </div>
  );
};

export default PorfileCard;
