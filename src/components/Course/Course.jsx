import React, { useEffect, useState } from "react";
import ContentList from "../ContentList/ContentList.jsx";
import LessonContent from "../LessonContent/LessonContent.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourse,
  GetStats,
  setCurrVid,
} from "../../RTK/Slices/CourseSlice.js";
import "../Course/Course.css";
import { useParams } from "react-router-dom";
const Course = () => {
  const params = useParams();
  const currCourseID = params.courseid;
  const course = useSelector((state) => state.Course);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourse(params.courseid));
  }, [params.courseid]);

  return (
    <div key={course.courseid} className="course-page">
      <LessonContent course={course} />
      <ContentList course={course} />
    </div>
  );
};

export default Course;
