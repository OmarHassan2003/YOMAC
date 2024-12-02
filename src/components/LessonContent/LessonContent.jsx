import React, { useEffect, useState } from "react";
import CourseNavbar from "../CourseNavbar/CourseNavbar.jsx";
import "../LessonContent/LessonContent.css";
const LessonContent = ({ course }) => {
  return (
    <div key={course.currVid?.videoid} className="course-body">
      <div key={course.currVid?.videoid} className="video-section">
        <video
          className="course-video"
          src={course.currVid?.videolink}
          autoPlay
          controls
        ></video>
        <h1>{course.currVid?.title}</h1>
      </div>
      <CourseNavbar course={course} />
    </div>
  );
};

export default LessonContent;
