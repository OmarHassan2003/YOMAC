import React, { useRef, useState } from "react";
import "./Form.css";

const CourseForm = () => {
  const formRef = useRef(null);
  const [sections, setSections] = useState([]);

  // Add a new section
  const addSection = () => {
    setSections([
      ...sections,
      {
        title: "",
        quizzes: [],
        videos: [],
      },
    ]);
  };

  // Add a new quiz to a specific section
  const addQuiz = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].quizzes.push({
      title: "",
      duration: "",
      totalMarks: "",
      passingMarks: "",
      questions: [],
    });
    setSections(updatedSections);
  };

  // Add a question to a quiz
  const addQuestion = (sectionIndex, quizIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].quizzes[quizIndex].questions.push({
      text: "",
      choices: ["", "", "", ""],
      correctAnswerIndex: 0,
    });
    setSections(updatedSections);
  };

  // Add a video to a specific section
  const addVideo = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos.push({ title: "", link: "" });
    setSections(updatedSections);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const course = {
      title: e.target.title.value,
      duration: e.target.duration.value,
      description: e.target.description.value,
      categoryID: e.target.categoryID.value,
      seenStatus: e.target.seenStatus.value,
      price: e.target.price.value,
      requirements: e.target.requirements.value,
      courseImage: e.target.courseImage.files[0],
      certificate: e.target.certificate.files[0],
      sections,
    };
    console.log(course);
  };

  return (
    <form className="course-form" ref={formRef} onSubmit={handleSubmit}>
      <h2>Create a Course</h2>

      <label>Title</label>
      <input type="text" name="title" placeholder="Course Title" />

      <label>Duration</label>
      <input type="text" name="duration" placeholder="Duration" />

      <label>Description</label>
      <textarea name="description" placeholder="Course Description"></textarea>

      <label>Category ID</label>
      <input type="text" name="categoryID" placeholder="Category ID" />

      <label>Seen Status</label>
      <select name="seenStatus">
        <option value="Seen">Seen</option>
        <option value="Unseen">Unseen</option>
      </select>

      <label>Price</label>
      <input type="text" name="price" placeholder="Price" />

      <label>Requirements</label>
      <textarea
        name="requirements"
        placeholder="Course Requirements"
      ></textarea>

      <label>Course Image</label>
      <input type="file" name="courseImage" accept="image/*" />

      <label>Certificate</label>
      <input
        type="file"
        name="certificate"
        accept=".pdf,.doc,.docx,.png,.jpg"
      />

      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="section">
          <h3>Section {sectionIndex + 1}</h3>

          <label>Section Title</label>
          <input
            type="text"
            placeholder="Section Title"
            value={section.title}
            onChange={(e) => {
              const updatedSections = [...sections];
              updatedSections[sectionIndex].title = e.target.value;
              setSections(updatedSections);
            }}
          />

          {/* Quizzes */}
          <h4>Quizzes</h4>
          {section.quizzes.map((quiz, quizIndex) => (
            <div key={quizIndex} className="quiz">
              <input
                name={`section_${sectionIndex}_quizTitle_${quizIndex}`}
                type="text"
                placeholder="Quiz Title"
                value={quiz.title}
                onChange={(e) => {
                  handleInputChange(
                    e,
                    sectionIndex,
                    null,
                    `section_${sectionIndex}_quizTitle_${quizIndex}`
                  );
                }}
              />
              <input
                name={`section_${sectionIndex}_Quiz Duration_${quizIndex}`}
                type="text"
                placeholder="Quiz Duration"
                value={quiz.duration}
                onChange={(e) => {
                  handleInputChange(
                    e,
                    sectionIndex,
                    null,
                    `section_${sectionIndex}_Quiz Duration_${quizIndex}`
                  );
                }}
              />
              <input
                name={`section_${sectionIndex}_Quiz totalMarks_${quizIndex}`}
                type="text"
                placeholder="Total Marks"
                value={quiz.totalMarks}
                onChange={(e) => {
                  handleInputChange(
                    e,
                    sectionIndex,
                    null,
                    `section_${sectionIndex}_Quiz totalMarks_${quizIndex}`
                  );
                }}
              />
              <input
                name={`section_${sectionIndex}_Quiz passingMarks_${quizIndex}`}
                type="text"
                placeholder="Passing Marks"
                value={quiz.passingMarks}
                onChange={(e) => {
                  handleInputChange(
                    e,
                    sectionIndex,
                    null,
                    `section_${sectionIndex}_Quiz passingMarks_${quizIndex}`
                  );
                }}
              />

              {/* Questions */}
              {quiz.questions.map((question, qIndex) => (
                <div key={qIndex} className="questions">
                  <h4>Question {qIndex + 1}</h4>
                  <input
                    name={`section_${sectionIndex}_quiz_${quizIndex}_question_${qIndex}`}
                    type="text"
                    placeholder={`Question `}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        index,
                        null,
                        qIndex,
                        `section_${sectionIndex}_quiz_${quizIndex}_question_${qIndex}`
                      )
                    }
                  />
                  {[0, 1, 2, 3].map((cIndex) => (
                    <input
                      name={`section_${sectionIndex}_quiz_${quizIndex}_question_${qIndex}_choice_${cIndex}`}
                      key={cIndex}
                      type="text"
                      placeholder={`Choice ${cIndex + 1}`}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          index,
                          null,
                          qIndex,
                          `section_${sectionIndex}_quiz_${quizIndex}_question_${qIndex}_choice_${cIndex}`
                        )
                      }
                    />
                  ))}
                  <input
                    name={`section_${sectionIndex}_quiz_${quizIndex}__correct_answer_${qIndex}`}
                    type="text"
                    placeholder={`Correct Answer Index `}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        index,
                        null,
                        qIndex,
                        `section_${sectionIndex}_quiz_${quizIndex}__correct_answer_${qIndex}`
                      )
                    }
                  />
                </div>
              ))}
            </div>
          ))}
          <button type="button" onClick={() => addQuiz(sectionIndex)}>
            Add Quiz
          </button>

          {/* Videos */}
          <h4>Videos</h4>
          {section.videos.map((video, videoIndex) => (
            <div key={videoIndex}>
              <label>Video Title</label>
              <input
                type="text"
                placeholder="Video Title"
                value={video.title}
                onChange={(e) => {
                  const updatedSections = [...sections];
                  updatedSections[sectionIndex].videos[videoIndex].title =
                    e.target.value;
                  setSections(updatedSections);
                }}
              />
              <label>Video Link</label>
              <input
                type="text"
                placeholder="Video Link"
                value={video.link}
                onChange={(e) => {
                  const updatedSections = [...sections];
                  updatedSections[sectionIndex].videos[videoIndex].link =
                    e.target.value;
                  setSections(updatedSections);
                }}
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
      <button type="submit">Submit Course</button>
    </form>
  );
};

export default CourseForm;
