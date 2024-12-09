import React, { useState } from "react";
import {
  getVideo,
  setCurrSection,
  setCurrVid,
} from "../../RTK/Slices/CourseSlice";
import { useDispatch, useSelector } from "react-redux";
import "../ContentList/ContentList.css";
import vidIcon from "../../assets/ui-element.png";
import quizIcon from "../../assets/speech-bubble.png";
import { useNavigate } from "react-router-dom";
const ContentList = ({ course }) => {
  const [activeModule, setActiveModule] = useState(null);
  const navigate = useNavigate();
  const sections = course.sections;
  const toggleModule = (id) => {
    setActiveModule(activeModule === id ? null : id);
  };
  const { fetchedVideo } = useSelector((state) => state.Course);
  const dispatch = useDispatch();
  const updateCurrentVideo = (video) => dispatch(setCurrVid(video));

  const updateCurrentSection = (section) => {
    dispatch(setCurrSection(section));
  };
  const changeVid = (vidId, secId) => {
    const sec = course.sections.find((el) => el.coursesectionid === secId);
    updateCurrentSection(sec);
    dispatch(getVideo(vidId));
    updateCurrentVideo(fetchedVideo);
  };
  const displayQuiz = (quizId, secId) => {
    const sec = course.sections.find((el) => el.coursesectionid === secId);
    updateCurrentSection(sec);
    navigate(`/course/${course.courseid}/quiz/${quizId}`);
  };
  return (
    <div className="content-list">
      <h2>Course Content</h2>
      <div className="modules">
        {sections.map((module) => (
          <div key={module.coursesectionid} className="module">
            <div
              className="module-header"
              onClick={() => toggleModule(module.coursesectionid)}
            >
              <h3>{module.title}</h3>
              <span>{module.duration}</span>
            </div>
            {activeModule === module.coursesectionid && (
              <div className="lessons">
                {module.videos.map((video) => (
                  <div
                    key={video.videoid}
                    className="lesson"
                    onClick={() =>
                      changeVid(video.videoid, module.coursesectionid)
                    }
                  >
                    <div className="lesson-icon-and-title">
                      <img
                        src={vidIcon}
                        alt="Video Icon"
                        className="lesson-icon"
                      />
                      <p>{video.title}</p>
                    </div>
                    <span>{video.videoduration}</span>
                  </div>
                ))}
                {module.quizzes.map((quiz) => (
                  <div
                    key={quiz.quizexamid}
                    className="lesson"
                    onClick={() =>
                      displayQuiz(quiz.quizexamid, module.coursesectionid)
                    }
                  >
                    <div className="lesson-icon-and-title">
                      <img
                        src={quizIcon}
                        alt="Video Icon"
                        className="lesson-icon"
                      />
                      <p>{quiz.title}</p>
                    </div>
                    <span>{quiz.duration}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default ContentList;
