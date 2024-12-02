import React, { useEffect, useState } from "react";
import ContentList from "../ContentList/ContentList.jsx";
import LessonContent from "../LessonContent/LessonContent.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "../../RTK/Slices/CourseSlice.js";
import "../Course/Course.css";
const Course = () => {
  const course = useSelector((state) => state.Course);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourse(2));
    console.log(course);
  }, []);

  return (
    <div key={course.courseid} className="course-page">
      <LessonContent course={course} />
      <ContentList course={course} />
    </div>
  );
};

export default Course;
