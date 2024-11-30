import React from "react";
import ContentList from "./ContentList";
import LessonContent from "./LessonContent";

const Course = () => {
  return (
    <div className="course-page">
      <LessonContent />
      <ContentList />
    </div>
  );
};

export default Course;
