import { useState } from "react";

const CourseNavbar = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // onTabChange(tab);
  };
  // const course = fetch("http://localhost:3500/api/auth/get_single_course/2");
  const messages = [
    {
      id: 1,
      question: "Why is Farag Gay?",
      sentAt: "12:53pm",
    },
    {
      id: 2,
      question: "What is Omar Hassan?",
      sentAt: "5:31pm",
    },
    {
      id: 3,
      question: "Why is Bahgat Helwany?",
      sentAt: "8:12pm",
    },
  ];

  return (
    <div className="belowvid">
      <div className="course-navbar">
        <div
          className={`tab ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => handleTabClick("overview")}
        >
          Overview
        </div>
        <div
          className={`tab ${activeTab === "q&a" ? "active" : ""}`}
          onClick={() => handleTabClick("q&a")}
        >
          Q&A
        </div>
        <div
          className={`tab ${activeTab === "reviews" ? "active" : ""}`}
          onClick={() => handleTabClick("reviews")}
        >
          Reviews
        </div>
      </div>
      <div className="navcontent">
        <div
          className={`description ${activeTab !== "overview" ? "hidden" : ""}`}
        >
          <h2>Course Description</h2>
          <p>
            Progressively synthesize clicks-and-mortar infrastructures for
            impactful quality vectors...
          </p>
          <p>
            <strong>Course Duration</strong> <span>68 hrs</span>
          </p>
        </div>
        <div className={`qna ${activeTab !== "q&a" ? "hidden" : ""}`}>
          {messages.map((message) => (
            <div key={message.id} className="message">
              <p>{message.question}</p>
              <span>{message.sentAt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseNavbar;
