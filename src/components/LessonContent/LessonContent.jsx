import React, { useEffect, useRef } from "react";
import CourseNavbar from "../CourseNavbar/CourseNavbar.jsx";
import "../LessonContent/LessonContent.css";
import { useDispatch, useSelector } from "react-redux";
import { getVideo, updateVidProgress } from "../../RTK/Slices/CourseSlice.js";

const LessonContent = ({ course }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Authorization);
  const role = user.role;
  const vid = useRef(null);

  function updateProgress(currentTime) {
    if (role === "instructor" || !course.currVid) return;
    const progress = (currentTime / course.currVid.videoduration) * 100;
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
      updateProgress(video.currentTime);
    };

    video.onended = () => {
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
    console.log(course.fetchedVideo);
    const video = vid.current;
    if (!video) return;
    console.log(video);
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
          <h1>{course.currVid?.title}</h1>
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
