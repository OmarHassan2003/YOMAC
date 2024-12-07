import React, { useRef, useState } from "react";
import "./CreateCourse.css"; // Import the CSS file

const CreateCourse = () => {
  const [sections, setSections] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    description: "",
    categoryID: "",
    seenStatus: "Seen",
    price: "",
    requirements: "",
    courseImage: null,
    certificate: null,
  });

  const addSection = () => {
    setSections([
      ...sections,
      {
        title: "",
        quizzes: [],
        videos: [{ title: "", link: "" }],
      },
    ]);
  };
  const addQuiz = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].quizzes.push({
      title: "",
      duration: "",
      totalMarks: "",
      passingMarks: "",
      questions: [
        { text: "", choices: ["", "", "", ""], correctAnswerIndex: 0 },
        { text: "", choices: ["", "", "", ""], correctAnswerIndex: 0 },
      ],
    });
    setSections(updatedSections);
  };

  const addVideo = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos.push({ title: "", link: "" });
    setSections(updatedSections);
  };

  const handleInputChange = (e, field, sectionIndex, videoIndex) => {
    if (field === "courseImage" || field === "certificate") {
      setFormData({ ...formData, [field]: e.target.files[0] });
    } else if (field === "sectionTitle") {
      const updatedSections = [...sections];
      updatedSections[sectionIndex].title = e.target.value;
      setSections(updatedSections);
    } else if (field === "videoTitle" || field === "videoLink") {
      const updatedSections = [...sections];
      updatedSections[sectionIndex].videos[videoIndex][field] = e.target.value;
      setSections(updatedSections);
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const course = {
      ...formData,
      sections,
    };
    console.log(course); // Log the course object (replace with API call or further processing)
  };

  const CourseForm = useRef(null);

  function BahgatHabdleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(CourseForm.current);

    const course = {
      title: formData.get("course_title"),
      description: formData.get("course_description"),
      seenStatus: formData.get("course_status"),
      price: formData.get("course_price"),
      requirements: formData.get("course_requirements"),
      courseImage: formData.get("course_image"),
      courseCertificate: formData.get("course_certificate"),
      sections: [],
    };

    const sectionTitles = formData.getAll("section_title");

    const sections_number = sectionTitles.length();

    const section_model = {};

    for (let i = 0; i < sections_number; i++) {
      const quizTitles = formData.getAll(`section_${i}_quizTitle`);
      const quizDurations = formData.getAll(`section_${i}_quizDuration`);
      const quizTotalMarks = formData.get(`section_${i}_quizTotalMarks`);
      const quizPassingMarks = formData.get(`section_${i}_quizPassingMarks`);
      const quizQuestions = [{}, {}];
      for (let j = 0; j < 2; ++j) {
        quizQuestions[j].text = formData.get(`section_${i}_question_${j}`);
        quizQuestions[j].choices = [];
        for (let z = 0; z < 4; ++z) {
          quizQuestions[j].choices.push(
            formData.get(`section_${i}_question_${j}_choice_${z}`)
          );
        }
      }
      const quiz = {
        title: quizTitles[i],
        duration: quizDurations[i],
        totlaMarks: quizTotalMarks,
        passingMarks: quizPassingMarks,
      };
      course.sections.push({
        title: sectionTitles[i],
      });
    }
  }

  return (
    <form
      className="course-form"
      ref={CourseForm}
      onSubmit={BahgatHabdleSubmit}
    >
      <h2>Create a Course</h2>

      <label>Title</label>
      <input type="text" name="course_title" placeholder="Course Title" />

      <label>Description</label>
      <textarea
        name="course_description"
        placeholder="Course Description"
      ></textarea>

      <label>Seen Status</label>
      <select name="course_status">
        <option value="Seen">Seen</option>
        <option value="Unseen">Unseen</option>
      </select>

      <label>Price</label>
      <input
        name="course_price"
        type="text"
        placeholder="Price"
        onChange={(e) => {
          handleSubmit;
        }}
      />

      <label>Requirements</label>
      <textarea
        name="course_requirements"
        placeholder="Course Requirements"
      ></textarea>

      <label>Course Image</label>
      <input name="course_image" type="file" accept="image/*" />

      <label>Certificate</label>
      <input
        name="course_certificate"
        type="file"
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
      />

      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="section">
          <h3>Section {sectionIndex + 1}</h3>
          <input
            name={`section_title`}
            type="text"
            placeholder="Section Title"
            onChange={(e) =>
              handleInputChange(e, sectionIndex, null, "sectionTitle")
            }
          />
          {section?.quizzes?.map((quiz, quizIndex) => (
            <div key={quizIndex} className="quiz">
              <h4>Quiz {quizIndex + 1}</h4>
              <input
                name={`section_${sectionIndex}_quizTitle`}
                type="text"
                placeholder="Quiz Title"
                value={quiz.title}
                onChange={(e) => {
                  handleInputChange(
                    e,
                    sectionIndex,
                    null,
                    `section_${sectionIndex}_quizTitle`
                  );
                }}
              />
              <input
                name={`section_${sectionIndex}_Quiz Duration`}
                type="text"
                placeholder="Quiz Duration"
                value={quiz.duration}
                onChange={(e) => {
                  handleInputChange(
                    e,
                    sectionIndex,
                    null,
                    `section_${sectionIndex}_Quiz Duration`
                  );
                }}
              />
              <input
                name={`section_${sectionIndex}_Quiz totalMarks`}
                type="text"
                placeholder="Total Marks"
                value={quiz.totalMarks}
                onChange={(e) => {
                  handleInputChange(
                    e,
                    sectionIndex,
                    null,
                    `section_${sectionIndex}_Quiz totalMarks`
                  );
                }}
              />
              <input
                name={`section_${sectionIndex}_Quiz passingMarks`}
                type="text"
                placeholder="Passing Marks"
                value={quiz.passingMarks}
                onChange={(e) => {
                  handleInputChange(
                    e,
                    sectionIndex,
                    null,
                    `section_${sectionIndex}_Quiz passingMarks`
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

          <h4>Videos</h4>
          {section.videos.map((video, videoIndex) => (
            <div key={videoIndex} className="video-input">
              <input
                name={`section_${sectionIndex}_video_${videoIndex}_videoTitle`}
                type="text"
                placeholder="Video Title"
                onChange={(e) =>
                  handleInputChange(e, sectionIndex, videoIndex, "videoTitle")
                }
              />
              <input
                name={`section_${sectionIndex}_video_${videoIndex}_videoLink`}
                type="text"
                placeholder="Video Link"
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
