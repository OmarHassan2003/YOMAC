import React from "react";
import CourseNavbar from "./CourseNavbar";

const LessonContent = () => {
  return (
    <div className="course-body">
      <div className="video-section">
        <video className="course-video" controls>
          <source src="blitza whiff.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h1>Introduction Figma Basic to Advance</h1>
        <p className="author">By William Joe | Figma</p>
      </div>
      <CourseNavbar />
    </div>
  );
};

export default LessonContent;
