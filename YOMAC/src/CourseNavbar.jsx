import React, { useState } from "react";

const Navbar = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

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
      {activeTab === "overview" && (
        <div className="description">
          <h2>Course Description</h2>
          <p>
            Progressively synthesize clicks-and-mortar infrastructures for
            impactful quality vectors...
          </p>
          <h3>Course Outcomes</h3>
          <ul>
            <li>15 lectures and 5.5 hours of content</li>
            <li>Basics designing in Figma</li>
            <li>Live project end-to-end software</li>
            <li>Design mobile and desktop apps</li>
          </ul>
        </div>
      )}
      {activeTab === "q&a" && (
        <div className="q&a">
          {messages.map((message) => (
            <div key={message.id} className="message">
              <p>{message.question}</p>
              <span>{message.sentAt}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
