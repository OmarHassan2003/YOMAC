import React, { useState } from "react";
import "./CreateCourse.css"; // Import the CSS file

const CreateCourse = () => {
  const [sections, setSections] = useState([]);

  const addSection = () => {
    setSections([
      ...sections,
      {
        title: "",
        quiz: {
          title: "",
          quizDuration: "",
          totalMarks: "",
          passingMarks: "",
          questions: [
            { text: "", choices: ["", "", "", ""], correctAnswerIndex: 0 },
            { text: "", choices: ["", "", "", ""], correctAnswerIndex: 0 },
          ],
        },
        videos: [{ title: "", link: "" }],
      },
    ]);
  };

  const addVideo = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos.push({ title: "", link: "" });
    setSections(updatedSections);
  };

  const handleInputChange = (e, sectionIndex, videoIndex, field) => {
    const updatedSections = [...sections];
    if (field === "sectionTitle") {
      updatedSections[sectionIndex].title = e.target.value;
    } else if (field === "videoTitle" || field === "videoLink") {
      updatedSections[sectionIndex].videos[videoIndex][field] = e.target.value;
    }
    setSections(updatedSections);
  };

  return (
    <form className="course-form">
      <h2>Create a Course</h2>

      <label>Title</label>
      <input type="text" placeholder="Course Title" />

      <label>Duration</label>
      <input type="text" placeholder="Duration" />

      <label>Description</label>
      <textarea placeholder="Course Description"></textarea>

      <label>Seen Status</label>
      <select>
        <option value="Seen">Seen</option>
        <option value="Unseen">Unseen</option>
      </select>

      <label>Price</label>
      <input type="text" placeholder="Price" />

      <label>Requirements</label>
      <textarea placeholder="Course Requirements"></textarea>

      <label>Course Image</label>
      <input type="file" accept="image/*" />

      <label>Certificate</label>
      <input type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" />

      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="section">
          <h3>Section {sectionIndex + 1}</h3>
          <input
            type="text"
            placeholder="Section Title"
            value={section.title}
            onChange={(e) =>
              handleInputChange(e, sectionIndex, null, "sectionTitle")
            }
          />
          <h4>Quiz</h4>
          <input
            type="text"
            placeholder="Quiz Title"
            value={section.quiz.title}
            onChange={(e) =>
              handleInputChange(e, sectionIndex, null, "quizTitle")
            }
          />
          <input
            type="text"
            placeholder="Quiz Duration"
            value={section.quiz.quizDuration}
            onChange={(e) =>
              handleInputChange(e, sectionIndex, null, "quizDuration")
            }
          />
          <input
            type="text"
            placeholder="Total Marks"
            value={section.quiz.totalMarks}
            onChange={(e) =>
              handleInputChange(e, sectionIndex, null, "totalMarks")
            }
          />
          <input
            type="text"
            placeholder="Passing Marks"
            value={section.quiz.passingMarks}
            onChange={(e) =>
              handleInputChange(e, sectionIndex, null, "passingMarks")
            }
          />

          <h4>Videos</h4>
          {section.videos.map((video, videoIndex) => (
            <div key={videoIndex} className="video-input">
              <input
                type="text"
                placeholder="Video Title"
                value={video.title}
                onChange={(e) =>
                  handleInputChange(e, sectionIndex, videoIndex, "videoTitle")
                }
              />
              <input
                type="text"
                placeholder="Video Link"
                value={video.link}
                onChange={(e) =>
                  handleInputChange(e, sectionIndex, videoIndex, "videoLink")
                }
              />
            </div>
          ))}
          <button type="button" onClick={() => addVideo(sectionIndex)}>
            Add Video
          </button>
        </div>
      ))}
      <button type="button" onClick={addSection}>
        Add Section
      </button>
      <button type="submit">Save Profile</button>
    </form>
  );
};

export default CreateCourse;
