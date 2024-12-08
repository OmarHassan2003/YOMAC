import React, { useRef, useState } from "react";
import "./CreateCourse.css"; // Import the CSS file
import encodeFileToBase64 from "../../utils/EncodeMedia";
import { CreateCourseAPI } from "../../RTK/Slices/CourseSlice";
import { useDispatch } from "react-redux";

const CreateCourse = () => {
  const [sections, setSections] = useState([]);
  const dispatch = useDispatch();

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

  const CourseForm = useRef(null);

  async function BahgatHabdleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(CourseForm.current);
    const image = formData.get("course_image");
    const courseImage = await encodeFileToBase64(image);
    const certificate = formData.get("course_certificate");
    const courseCertificate = await encodeFileToBase64(certificate);
    const course = {
      title: formData.get("course_title"),
      description: formData.get("course_description"),
      seen_status: formData.get("course_status"),
      duration: "2323 hours",
      price: +formData.get("course_price"),
      categoryID: 1,
      requirements: formData.get("course_requirements").split(","),
      course_image: courseImage,
      certificate: courseCertificate,
      sections: [],
    };

    const sectionTitles = formData.getAll("section_title");

    const sections_number = sectionTitles.length;

    for (let i = 0; i < sections_number; i++) {
      const quizTitles = formData.getAll(`section_${i}_quizTitle`);
      const quizDurations = formData.getAll(`section_${i}_Quiz Duration`);
      const quizTotalMarks = formData.getAll(`section_${i}_Quiz totalMarks`);
      const quizPassingMarks = formData.getAll(
        `section_${i}_Quiz passingMarks`
      );
      const quizzes = [];
      for (let y = 0; y < quizTitles.length; ++y) {
        const quizQuestions = [{}, {}];
        for (let j = 0; j < 2; ++j) {
          quizQuestions[j].text = formData.get(
            `section_${i}_quiz_${y}_question_${j}`
          );
          quizQuestions[j].choices = [];
          for (let z = 0; z < 4; ++z) {
            quizQuestions[j].choices.push(
              formData.get(`section_${i}_quiz_${y}_question_${j}_choice_${z}`)
            );
          }
          quizQuestions[j].correct_answer_index = +formData.get(
            `section_${i}_quiz_${y}_correct_answer_${j}`
          );
        }
        console.log(quizDurations[y], quizTotalMarks[y], quizPassingMarks[y]);
        quizzes.push({
          title: quizTitles[y],
          quizDuration: +quizDurations[y],
          totlaMarks: +quizTotalMarks[y],
          passingMarks: +quizPassingMarks[y],
          questions: quizQuestions,
        });
      }
      const videoTitles = formData.getAll(`section_${i}_videoTitle`);
      const videoLinks = formData.getAll(`section_${i}_videoLink`);
      const videos = [];
      for (let k = 0; k < videoTitles.length; ++k) {
        const vidLink = await encodeFileToBase64(videoLinks[k]);
        videos.push({
          title: videoTitles[k],
          video: vidLink,
        });
      }
      course.sections.push({
        title: sectionTitles[i],
        quiz: quizzes[0],
        videos: videos,
      });
    }
    dispatch(CreateCourseAPI(course));
    console.log(course);
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
        <option value="public">Public </option>
        <option value="private">Private</option>
      </select>

      <label>Price</label>
      <input name="course_price" type="text" placeholder="Price" />

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
          />
          {section?.quizzes?.map((quiz, quizIndex) => (
            <div key={quizIndex} className="quiz">
              <h4>Quiz {quizIndex + 1}</h4>
              <input
                name={`section_${sectionIndex}_quizTitle`}
                type="text"
                placeholder="Quiz Title"
              />
              <input
                name={`section_${sectionIndex}_Quiz Duration`}
                type="text"
                placeholder="Quiz Duration"
              />
              <input
                name={`section_${sectionIndex}_Quiz totalMarks`}
                type="text"
                placeholder="Total Marks"
              />
              <input
                name={`section_${sectionIndex}_Quiz passingMarks`}
                type="text"
                placeholder="Passing Marks"
              />

              {/* Questions */}
              {quiz.questions.map((question, qIndex) => (
                <div key={qIndex} className="questions">
                  <h4>Question {qIndex + 1}</h4>
                  <input
                    name={`section_${sectionIndex}_quiz_${quizIndex}_question_${qIndex}`}
                    type="text"
                    placeholder={`Question `}
                  />
                  {[0, 1, 2, 3].map((cIndex) => (
                    <input
                      name={`section_${sectionIndex}_quiz_${quizIndex}_question_${qIndex}_choice_${cIndex}`}
                      key={cIndex}
                      type="text"
                      placeholder={`Choice ${cIndex + 1}`}
                    />
                  ))}
                  <input
                    name={`section_${sectionIndex}_quiz_${quizIndex}__correct_answer_${qIndex}`}
                    type="text"
                    placeholder={`Correct Answer Index `}
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
                name={`section_${sectionIndex}_videoTitle`}
                type="text"
                placeholder="Video Title"
              />
              <input
                name={`section_${sectionIndex}_videoLink`}
                type="file"
                accept="mp4"
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
