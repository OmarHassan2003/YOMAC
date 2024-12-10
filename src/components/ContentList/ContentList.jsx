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
import secIcon from "../../assets/sections.png";
import { useNavigate } from "react-router-dom";

const ContentList = ({ course }) => {
  const user = useSelector((state) => state.Authorization);
  const role = user.role;
  let isStudent = false;
  let isInstructor = true;
  // if (role === "student") isStudent = true;
  // else isInstructor = true;

  const [activeModule, setActiveModule] = useState(null);
  const [showAddVideoSection, setShowAddVideoSection] = useState(null);
  const [showAddQuizSection, setShowAddQuizSection] = useState(null);
  const [showAddSectionForm, setShowAddSectionForm] = useState(false);

  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newQuizTitle, setNewQuizTitle] = useState("");
  const [quizQuestions, setQuizQuestions] = useState([]);

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

  const handleAddSection = () => {
    console.log("Adding Section:", newSectionTitle);
    setShowAddSectionForm(false);
    setNewSectionTitle("");
  };

  const handleAddVideo = (sectionId) => {
    console.log("Adding Video to Section:", sectionId, newVideoTitle);
    setShowAddVideoSection(null);
    setNewVideoTitle("");
  };

  const handleAddQuiz = (sectionId) => {
    console.log(
      "Adding Quiz to Section:",
      sectionId,
      newQuizTitle,
      quizQuestions
    );
    setShowAddQuizSection(null);
    setNewQuizTitle("");
    setQuizQuestions([]);
  };

  const handleAddQuestionToQuiz = () => {
    setQuizQuestions([
      ...quizQuestions,
      {
        questionText: "",
        choices: ["", "", "", ""],
        correctAnswerIndex: "",
      },
    ]);
  };

  const updateQuizQuestion = (index, field, value) => {
    const updatedQuestions = [...quizQuestions];
    if (field === "questionText") {
      updatedQuestions[index].questionText = value;
    } else if (field === "correctAnswerIndex") {
      updatedQuestions[index].correctAnswerIndex = value;
    } else {
      updatedQuestions[index].choices[field] = value;
    }
    setQuizQuestions(updatedQuestions);
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
              <div className="lesson-icon-and-title">
                <img src={secIcon} alt="Section Icon" className="lesson-icon" />
                <h3>{module.title}</h3>
              </div>
              <span>{module.duration}</span>
            </div>
            {activeModule === module.coursesectionid && (
              <div className="lessons">
                {module.videos.map((video) => (
                  <div
                    key={video.videoid}
                    className="lesson"
                    onClick={() => {
                      changeVid(video.videoid, module.coursesectionid);
                    }}
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
                    onClick={() => {
                      displayQuiz(quiz.quizexamid, module.coursesectionid);
                    }}
                  >
                    <div className="lesson-icon-and-title">
                      <img
                        src={quizIcon}
                        alt="Quiz Icon"
                        className="lesson-icon"
                      />
                      <p>{quiz.title}</p>
                    </div>
                    <span>{quiz.duration}</span>
                  </div>
                ))}
                {isInstructor && (
                  <>
                    <button
                      className="add-btn"
                      onClick={() =>
                        setShowAddVideoSection(
                          showAddVideoSection === module.coursesectionid
                            ? null
                            : module.coursesectionid
                        )
                      }
                    >
                      Add Video
                    </button>
                    {showAddVideoSection === module.coursesectionid && (
                      <div className="inline-form">
                        <input
                          type="text"
                          placeholder="Video Title"
                          value={newVideoTitle}
                          onChange={(e) => setNewVideoTitle(e.target.value)}
                        />
                        <input type="file" />
                        <button
                          className="save-btn"
                          onClick={() => handleAddVideo(module.coursesectionid)}
                        >
                          Save Video
                        </button>
                      </div>
                    )}
                    <button
                      className="add-btn"
                      onClick={() =>
                        setShowAddQuizSection(
                          showAddQuizSection === module.coursesectionid
                            ? null
                            : module.coursesectionid
                        )
                      }
                    >
                      Add Quiz
                    </button>
                    {showAddQuizSection === module.coursesectionid && (
                      <div className="inline-form">
                        <input
                          type="text"
                          placeholder="Quiz Title"
                          value={newQuizTitle}
                          onChange={(e) => setNewQuizTitle(e.target.value)}
                        />
                        {quizQuestions.map((question, index) => (
                          <div key={index} className="inline-form">
                            <input
                              type="text"
                              placeholder="Question Text"
                              value={question.questionText}
                              onChange={(e) =>
                                updateQuizQuestion(
                                  index,
                                  "questionText",
                                  e.target.value
                                )
                              }
                            />
                            {question.choices.map((choice, i) => (
                              <input
                                key={i}
                                type="text"
                                placeholder={`Choice ${i + 1}`}
                                value={choice}
                                onChange={(e) =>
                                  updateQuizQuestion(index, i, e.target.value)
                                }
                              />
                            ))}
                            <input
                              type="text"
                              placeholder="Correct Answer Index"
                              value={question.correctAnswerIndex}
                              onChange={(e) =>
                                updateQuizQuestion(
                                  index,
                                  "correctAnswerIndex",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        ))}
                        <button
                          className="add-btn"
                          onClick={handleAddQuestionToQuiz}
                        >
                          Add Question
                        </button>
                        <button
                          className="save-btn"
                          onClick={() => handleAddQuiz(module.coursesectionid)}
                        >
                          Save Quiz
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        ))}
        {isInstructor && (
          <>
            <button
              className="add-section-btn"
              onClick={() => setShowAddSectionForm(!showAddSectionForm)}
            >
              Add Section
            </button>
            {showAddSectionForm && (
              <div className="inline-form">
                <input
                  type="text"
                  placeholder="Section Title"
                  value={newSectionTitle}
                  onChange={(e) => setNewSectionTitle(e.target.value)}
                />
                <button className="save-btn" onClick={handleAddSection}>
                  Save Section
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ContentList;
