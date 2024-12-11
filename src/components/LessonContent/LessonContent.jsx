import React, { useEffect, useState } from "react";
import CourseNavbar from "../CourseNavbar/CourseNavbar.jsx";
import "../LessonContent/LessonContent.css";
import { useSelector } from "react-redux";
const LessonContent = ({ course }) => {
  // console.log(course.currVid);
  const user = useSelector((state) => state.Authorization);
  const role = user.role;
  return (
    <div key={course.currVid?.videoid} className="course-body">
      {course.currVid !== null && (
        <div key={course.currVid?.videoid} className="video-section">
          <video
            className="course-video"
            src={course.currVid?.videolink}
            autoPlay
            controls
          ></video>
          <h1>{course.currVid?.title}</h1>
        </div>
      )}
      {course.currVid === null && (
        <div className="courseprofile">
          <img src={course.courseimage} className="courseimg" />
          <div className="title">Welcome To {course.title} Course</div>
        </div>
      )}
      <CourseNavbar course={course} />
    </div>
  );
};

export default LessonContent;
