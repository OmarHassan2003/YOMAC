import React, { useEffect, useRef, useState } from "react";
import CourseNavbar from "../CourseNavbar/CourseNavbar.jsx";
import "../LessonContent/LessonContent.css";
import { useDispatch, useSelector } from "react-redux";
import {
  editVidThenGet,
  getVideo,
  updateVidProgress,
} from "../../RTK/Slices/CourseSlice.js";

const LessonContent = ({ course }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Authorization);
  const role = user.role;
  const vid = useRef(null);
  const [courseTitle, setCourseTitle] = useState("");
  function updateProgress(currentTime) {
    if (role === "instructor" || !course.currVid) return;
    const progress = (currentTime / Number(course.currVid.videoduration)) * 100;
    const data = {
      video_id: course.currVid.videoid,
      progress,
      course_id: course.courseid,
      student_id: +user.user_id,
    };
    dispatch(updateVidProgress(data));
  }

  const setupVideoListeners = (video) => {
    video.onpause = () => {
      console.log(video.currentTime);
      updateProgress(video.currentTime);
    };

    video.onended = () => {
      console.log(video.currentTime);
      updateProgress(course.currVid.videoduration);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        updateProgress(video.currentTime);
      }
    };

    const handleBeforeUnload = () => {
      updateProgress(video.currentTime);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  };

  useEffect(() => {
    if (course.currVid === null) return;
    const video = vid.current;
    if (!video) return;
    setCourseTitle(course.currVid.title);
    const handleMetadataLoaded = () => {
      const progress = +course.currVid.videoprogress || 0;
      const duration = +course.currVid.videoduration || 1;
      if (
        typeof progress === "number" &&
        typeof duration === "number" &&
        duration > 0
      ) {
        const currentTime = (progress / 100) * duration;
        console.log(currentTime);
        video.currentTime = isNaN(currentTime) ? 0 : currentTime;
      } else {
        console.warn("Invalid video progress or duration");
        video.currentTime = 0; // Default to 0 if data is invalid
      }
    };

    video.addEventListener("loadedmetadata", handleMetadataLoaded);
    const cleanupListeners = setupVideoListeners(video);

    return () => {
      video.removeEventListener("loadedmetadata", handleMetadataLoaded);
      cleanupListeners();
    };
  }, [course.currVid]);

  const handleEditTitle = (e) => {
    const data = {
      videos: [{ videoID: course.currVid.videoid, title: courseTitle }],
      courseID: course.courseid,
    };
    dispatch(editVidThenGet(data));
    // course.currVid = course.fetchedVideo;
  };

  return (
    <div key={course.currVid?.videoid} className="course-body">
      {course.currVid !== null ? (
        <div key={course.currVid?.videoid} className="video-section">
          <video
            ref={vid}
            className="course-video"
            src={course.currVid?.videolink}
            controls
          ></video>
          {role === "student" && <h1>{course.currVid?.title}</h1>}
          {role === "instructor" && (
            <div className="title-info">
              <input
                type="text"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="course-title-input"
              />
              <button className="course-title-btn" onClick={handleEditTitle}>
                Edit Title
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="courseprofile">
          <img src={course.courseimage} className="courseimg" alt="Course" />
          <div className="title">Welcome To {course.title} Course</div>
        </div>
      )}
      <CourseNavbar course={course} />
    </div>
  );
};

export default LessonContent;
