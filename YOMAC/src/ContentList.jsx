import React, { useState } from "react";

const ContentList = () => {
  const [activeModule, setActiveModule] = useState(null);

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

  return (
    <div className="content-list">
      <h2>Course Content</h2>
      <p>Lecture (15) Total (5.5 hrs)</p>
      <div className="modules">
        {modules.map((module) => (
          <div key={module.id} className="module">
            <div
              className="module-header"
              onClick={() => toggleModule(module.id)}
            >
              <h3>{module.title}</h3>
              <span>{module.duration}</span>
            </div>
            {activeModule === module.id && (
              <div className="lessons">
                {module.lessons.map((lesson) => (
                  <div key={lesson.id} className="lesson">
                    <p>{lesson.title}</p>
                    <span>{lesson.duration}</span>
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
