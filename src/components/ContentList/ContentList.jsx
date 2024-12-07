import React, { useState } from "react";
import {
  getVideo,
  setCurrSection,
  setCurrVid,
} from "../../RTK/Slices/CourseSlice";
import { useDispatch, useSelector } from "react-redux";
import "../ContentList/ContentList.css";
const ContentList = ({ course }) => {
  const [activeModule, setActiveModule] = useState(null);

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
    // console.log(video, sec);
    // console.log(course.currVid, course.currSection);
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
                    <p>{video.title}</p>
                    <span>{video.videoduration}</span>
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
