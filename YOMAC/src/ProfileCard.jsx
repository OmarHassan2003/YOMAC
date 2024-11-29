import React from "react";

const PorfileCard = () => {
  const obj = {
    img: "images/3mk.jpg",
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
  return (
    <div className="sidebar">
      <img src={obj.img} class="profile-photo" />
      <div class="user-name">{obj.name}</div>
      <div class="status-badge">{obj.statusBadge}</div>
      <div class="stat">
        <div>
          <strong>{obj.courseInProgress}</strong>
          <br />
          Courses in Progress
        </div>
        <div>
          <strong>{obj.coursesCompleted}</strong>
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
      <ul class="support-list">
        {obj.supports.map((curr) => (
          <li>{curr}</li>
        ))}
      </ul>
    </div>
  );
};

export default PorfileCard;
