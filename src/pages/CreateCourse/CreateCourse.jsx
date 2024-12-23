import React, { useEffect, useRef, useState } from "react";
import "./CreateCourse.css"; // Import the CSS file
import encodeFileToBase64 from "../../utils/EncodeMedia";
import { CreateCourseAPI } from "../../RTK/Slices/CourseSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../RTK/Slices/CategorySlice";

const CreateCourse = () => {
  const [sections, setSections] = useState([]);
  const dispatch = useDispatch();
  let data = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const categories = data.categories;
  console.log(categories);

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

  async function getVideoDuration(file) {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      const video = document.createElement("video");
      video.src = url;
      video.addEventListener("loadedmetadata", () => {
        resolve(video.duration); // duration in seconds
        URL.revokeObjectURL(url);
      });
    });
  }

  async function BahgatHabdleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(CourseForm.current);
    const image = formData.get("course_image");
    const courseImage = await encodeFileToBase64(image);
    const certificate = formData.get("course_certificate");
    const courseCertificate = await encodeFileToBase64(certificate);
    let totalDuration = 0; // in seconds

    const course = {
      title: formData.get("course_title"),
      description: formData.get("course_description"),
      seen_status: formData.get("course_status"),
      duration: "0",
      price: +formData.get("course_price"),
      categoryID: +formData.get("course_category"),
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
        const quizQuestions = Array.from({ length: 2 }, (_, j) => ({
          questiontext: formData.get(`section_${i}_quiz_${y}_question_${j}`),
          choices: Array.from({ length: 4 }, (_, z) =>
            formData.get(`section_${i}_quiz_${y}_question_${j}_choice_${z}`)
          ),
          correctanswerindex:
            +formData.get(`section_${i}_quiz_${y}__correct_answer_${j}`) - 1,
        }));

        quizzes.push({
          title: quizTitles[y],
          quizDuration: +quizDurations[y],
          totalMarks: +quizTotalMarks[y],
          passingMarks: +quizPassingMarks[y],
          questions: quizQuestions,
        });
      }

      const videoTitles = formData.getAll(`section_${i}_videoTitle`);
      const videoLinks = formData.getAll(`section_${i}_videoLink`);
      const videos = [];

      for (let k = 0; k < videoTitles.length; ++k) {
        const vidLink = videoLinks[k];
        const videoDuration = await getVideoDuration(vidLink);
        totalDuration += videoDuration;

        const vidBase64 = await encodeFileToBase64(vidLink);
        videos.push({
          title: videoTitles[k],
          video: vidBase64,
          duration: videoDuration,
        });
      }

      course.sections.push({
        title: sectionTitles[i],
        quizzes: quizzes,
        videos: videos,
      });
    }

    course.duration = totalDuration;
    console.log(course);

    dispatch(CreateCourseAPI(course));
  }

  return (
    <form
      className="course-form"
      ref={CourseForm}
      onSubmit={BahgatHabdleSubmit}
    >
      <h2>Create a Course</h2>

      <label>Title</label>
      <input
        type="text"
        name="course_title"
        placeholder="Course Title"
        required
      />

      <label>Description</label>
      <textarea
        name="course_description"
        placeholder="Course Description"
        required
      ></textarea>

      <label>Category</label>
      <select name="course_category">
        {categories.map((category, index) => (
          <option key={index} value={category.categoryid}>
            {category.categorytext}
          </option>
        ))}
      </select>

      <label>Seen Status</label>
      <select name="course_status">
        <option value="public">Public </option>
        <option value="private">Private</option>
      </select>

      <label>Price</label>
      <input
        name="course_price"
        type="number"
        required
        placeholder="Price"
        className="input-number"
      />

      <label>Requirements</label>
      <textarea
        name="course_requirements"
        placeholder="Course Requirements"
      ></textarea>

      <label>Course Image</label>
      <input name="course_image" type="file" required accept="image/*" />

      <label>Certificate</label>
      <input
        name="course_certificate"
        type="file"
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        required
      />

      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="section">
          <h3>Section {sectionIndex + 1}</h3>
          <input
            name={`section_title`}
            type="text"
            placeholder="Section Title"
            required
          />
          {section?.quizzes?.map((quiz, quizIndex) => (
            <div key={quizIndex} className="quiz">
              <h4>Quiz {quizIndex + 1}</h4>
              <input
                name={`section_${sectionIndex}_quizTitle`}
                type="text"
                placeholder="Quiz Title"
                required
              />
              <input
                name={`section_${sectionIndex}_Quiz Duration`}
                type="number"
                className="input-number"
                required
                placeholder="Quiz Duration"
              />
              <input
                name={`section_${sectionIndex}_Quiz totalMarks`}
                type="number"
                className="input-number"
                required
                placeholder="Total Marks"
              />
              <input
                name={`section_${sectionIndex}_Quiz passingMarks`}
                type="number"
                className="input-number"
                required
                placeholder="Passing Marks"
              />

              {/* Questions */}
              {quiz.questions.map((question, qIndex) => (
                <div key={qIndex} className="questions">
                  <h4>Question {qIndex + 1}</h4>
                  <input
                    name={`section_${sectionIndex}_quiz_${quizIndex}_question_${qIndex}`}
                    type="text"
                    required
                    placeholder={`Question `}
                  />
                  {[0, 1, 2, 3].map((cIndex) => (
                    <input
                      name={`section_${sectionIndex}_quiz_${quizIndex}_question_${qIndex}_choice_${cIndex}`}
                      key={cIndex}
                      type="text"
                      required
                      placeholder={`Choice ${cIndex + 1}`}
                    />
                  ))}
                  <input
                    name={`section_${sectionIndex}_quiz_${quizIndex}__correct_answer_${qIndex}`}
                    type="number"
                    required
                    className="input-number"
                    placeholder={`Correct Answer Index `}
                    onChange={(e) => console.log(e.target.value)}
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
                required
              />
              <input
                name={`section_${sectionIndex}_videoLink`}
                type="file"
                accept="mp4"
                required
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
      <button type="submit">Create Course</button>
    </form>
  );
};

export default CreateCourse;
