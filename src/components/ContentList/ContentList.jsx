import React, { useState } from "react";
import {
  addQuizThenGet,
  addSection,
  addSectionThenGet,
  addVideoThenGet,
  getAssign,
  getVideo,
  setCurrSection,
  setCurrVid,
} from "../../RTK/Slices/CourseSlice";
import { useDispatch, useSelector } from "react-redux";
import "../ContentList/ContentList.css";
import vidIcon from "../../assets/ui-element.png";
import quizIcon from "../../assets/speech-bubble.png";
import assignIcon from "../../assets/assign.png";
import secIcon from "../../assets/sections.png";
import { useNavigate } from "react-router-dom";
import encodeFileToBase64 from "../../utils/EncodeMedia";

const ContentList = ({ course }) => {
  console.log(course);
  const user = useSelector((state) => state.Authorization);
  console.log(user);
  const role = user.role;
  let isStudent = false;
  let isInstructor = false;
  let isTopInstructor = false;
  let roleIndex = 0;
  if (role === "student") {
    isStudent = true;
    roleIndex = 0;
  } else {
    isInstructor = true;
    roleIndex = 1;
    if (course.topinstructorid == user.user_id) {
      isTopInstructor = true;
      roleIndex = 2;
    }
  }

  const [activeModule, setActiveModule] = useState(null);
  const [showAddVideoSection, setShowAddVideoSection] = useState(null);
  const [showAddAssignmentSection, setShowAddAssignmentSection] =
    useState(null);
  const [showAddQuizSection, setShowAddQuizSection] = useState(null);
  const [showAddSectionForm, setShowAddSectionForm] = useState(false);

  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newQuizTitle, setNewQuizTitle] = useState("");
  const [newQuizDuration, setNewQuizDuration] = useState("");
  const [newQuizTotalMarks, setNewQuizTotalMarks] = useState("");
  const [newQuizPassingMarks, setNewQuizPassingMarks] = useState("");
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
    navigate(`/course/${course.courseid}/quiz/${quizId}/${roleIndex}`);
  };

  const displayAssign = (assignId, secId) => {
    const sec = course.sections.find((el) => el.coursesectionid === secId);
    updateCurrentSection(sec);
    navigate(`/course/${course.courseid}/sec/${secId}/assign/${assignId}`);
  };

  const handleAddSection = (e) => {
    e.preventDefault();
    console.log("Adding Section:", newSectionTitle);
    const sec = {
      courseId: course.courseid,
      sections: [{ title: newSectionTitle }],
    };
    dispatch(addSectionThenGet(sec));
    setShowAddSectionForm(false);
    setNewSectionTitle("");
  };

  const handleAddVideo = async (e, sectionId) => {
    e.preventDefault();
    console.log("Adding Video to Section:", sectionId, newVideoTitle);
    setShowAddVideoSection(null);
    console.log(e.target[1].files);
    const vidEncoded = await encodeFileToBase64(e.target[1].files[0]);
    const newVid = {
      videos: [
        {
          video: vidEncoded,
          title: newVideoTitle,
          section_id: sectionId,
          courseId: course.courseid,
        },
      ],
    };
    dispatch(addVideoThenGet(newVid));
    setNewVideoTitle("");
  };

  const handleAddAssignment = (sectionId) => {
    console.log("Adding Assignment to Section:", sectionId);
    navigate(`/course/${course.courseid}/sec/${sectionId}/addAssign`);
  };

  const handleAddQuiz = (e, sectionId) => {
    e.preventDefault();
    console.log(
      "Adding Quiz to Section:",
      sectionId,
      newQuizTitle,
      newQuizDuration,
      newQuizTotalMarks,
      newQuizPassingMarks,
      quizQuestions
    );
    const newQuiz = {
      title: newQuizTitle,
      sectionID: sectionId,
      quizDuration: Number(newQuizDuration),
      totalMarks: Number(newQuizTotalMarks),
      passingMarks: Number(newQuizPassingMarks),
      questions: quizQuestions,
      courseId: course.courseid,
    };
    dispatch(addQuizThenGet(newQuiz));
    setShowAddQuizSection(null);
    setNewQuizTitle("");
    setNewQuizDuration("");
    setNewQuizTotalMarks("");
    setNewQuizPassingMarks("");
    setQuizQuestions([]);
  };

  const handleAddQuestionToQuiz = () => {
    setQuizQuestions([
      ...quizQuestions,
      {
        text: "",
        choices: ["", "", "", ""],
        correct_answer_index: "",
      },
    ]);
  };

  const updateQuizQuestion = (index, field, value) => {
    const updatedQuestions = [...quizQuestions];
    if (field === "text") {
      updatedQuestions[index].text = value;
    } else if (field === "correct_answer_index") {
      updatedQuestions[index].correct_answer_index = Number(value);
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
                {module.assignments.assignment.map((assignment) => (
                  <div
                    key={assignment.assignmentid}
                    className="lesson"
                    onClick={() => {
                      displayAssign(
                        assignment.assignmentid,
                        module.coursesectionid
                      );
                    }}
                  >
                    <div className="lesson-icon-and-title">
                      <img
                        src={assignIcon}
                        alt="Assign Icon"
                        className="lesson-icon"
                      />
                      <p>{assignment.title}</p>
                    </div>
                    <span>{assignment.duration}</span>
                  </div>
                ))}
                {isInstructor && (
                  <div className="btns">
                    {isTopInstructor && (
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
                          <form
                            className="inline-form"
                            onSubmit={(e) =>
                              handleAddVideo(e, module.coursesectionid)
                            }
                          >
                            <input
                              type="text"
                              placeholder="Video Title"
                              value={newVideoTitle}
                              onChange={(e) => setNewVideoTitle(e.target.value)}
                            />
                            <input type="file" />
                            <button className="save-btn" type="submit">
                              Save Video
                            </button>
                          </form>
                        )}
                      </>
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
                      <form
                        className="inline-form"
                        onSubmit={(e) =>
                          handleAddQuiz(e, module.coursesectionid)
                        }
                      >
                        <input
                          type="text"
                          placeholder="Quiz Title"
                          value={newQuizTitle}
                          onChange={(e) => setNewQuizTitle(e.target.value)}
                        />
                        <input
                          type="number"
                          placeholder="Quiz Duration in mins"
                          value={newQuizDuration}
                          onChange={(e) => setNewQuizDuration(e.target.value)}
                        />
                        <input
                          type="number"
                          placeholder="Quiz Total Marks"
                          value={newQuizTotalMarks}
                          onChange={(e) => setNewQuizTotalMarks(e.target.value)}
                        />
                        <input
                          type="number"
                          placeholder="Quiz Passing Marks"
                          value={newQuizPassingMarks}
                          onChange={(e) =>
                            setNewQuizPassingMarks(e.target.value)
                          }
                        />
                        {quizQuestions.map((question, index) => (
                          <div key={index} className="inline-form">
                            <input
                              type="text"
                              placeholder="Question Text"
                              value={question.text}
                              onChange={(e) =>
                                updateQuizQuestion(
                                  index,
                                  "text",
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
                              value={question.correct_answer_index}
                              onChange={(e) =>
                                updateQuizQuestion(
                                  index,
                                  "correct_answer_index",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        ))}
                        <button
                          className="add-btn"
                          type="button"
                          onClick={handleAddQuestionToQuiz}
                        >
                          Add Question
                        </button>
                        <button className="save-btn" type="submit">
                          Save Quiz
                        </button>
                      </form>
                    )}
                    <button
                      className="add-btn"
                      onClick={() =>
                        handleAddAssignment(module.coursesectionid)
                      }
                    >
                      Add Assignment
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {isTopInstructor && (
          <div className="btns">
            <button
              className="add-section-btn"
              onClick={() => setShowAddSectionForm(!showAddSectionForm)}
            >
              Add Section
            </button>
            {showAddSectionForm && (
              <form className="inline-form" onSubmit={handleAddSection}>
                <input
                  type="text"
                  placeholder="Section Title"
                  value={newSectionTitle}
                  onChange={(e) => setNewSectionTitle(e.target.value)}
                />
                <button className="save-btn" type="submit">
                  Save Section
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentList;
