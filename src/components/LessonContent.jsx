import React, { useEffect, useState } from "react";
import CourseNavbar from "./CourseNavbar";

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
        {/* <p className="author">By William Joe | Figma</p> */}
      </div>
      <CourseNavbar course={course} />
    </div>
  );
};

export default LessonContent;
