import React, { useState } from "react";
import { setCurrSection, setCurrVid } from "../RTK/Slices/CourseSlice";
import { useDispatch } from "react-redux";

const ContentList = ({ course }) => {
  const [activeModule, setActiveModule] = useState(null);

  const sections = course.sections;
  const modules = [
    {
      id: 1,
      title: "Module 1",
      duration: "54 Min",
      lessons: [
        { id: 1, title: "Getting started lessons", duration: "20 min" },
        { id: 2, title: "Overview about basic tools", duration: "30 min" },
        { id: 3, title: "Visual design using tools", duration: "40 min" },
      ],
    },
    {
      id: 2,
      title: "Module 2",
      duration: "54 Min",
      lessons: [
        { id: 1, title: "Getting started lessons", duration: "20 min" },
        { id: 2, title: "Overview about basic tools", duration: "30 min" },
        { id: 3, title: "Visual design using tools", duration: "40 min" },
      ],
    },
    {
      id: 3,
      title: "Module 3",
      duration: "54 Min",
      lessons: [
        { id: 1, title: "Getting started lessons", duration: "20 min" },
        { id: 2, title: "Overview about basic tools", duration: "30 min" },
        { id: 3, title: "Visual design using tools", duration: "40 min" },
      ],
    },
  ];
  const toggleModule = (id) => {
    setActiveModule(activeModule === id ? null : id);
  };
  const dispatch = useDispatch();
  const updateCurrentVideo = (video) => {
    dispatch(setCurrVid(video));
  };

  const updateCurrentSection = (section) => {
    dispatch(setCurrSection(section));
  };
  const changeVid = (vidId, secId) => {
    const sec = course.sections.find((el) => el.coursesectionid === secId);
    updateCurrentSection(sec);
    const vid = sec.videos.find((el) => el.videoid === vidId);
    updateCurrentVideo(vid);
    console.log(vid, sec);
    console.log(course.currVid, course.currSection);
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
