import React from "react";
import CourseNavbar from "./CourseNavbar";

const LessonContent = () => {
  return (
    <div className="course-body">
      <div className="video-section">
        <iframe
          className="course-video"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=Vw7e9w-vDl6QTNeo"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullscreen
        ></iframe>
        <h1>Introduction Figma Basic to Advance</h1>
        <p className="author">By William Joe | Figma</p>
      </div>
      <CourseNavbar />
    </div>
  );
};

export default LessonContent;
