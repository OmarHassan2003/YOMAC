import React, { useState } from "react";
import {
  addContestThenGet,
  addInstructorToCourse,
  addQuizThenGet,
  addSection,
  addSectionThenGet,
  addVideoThenGet,
  deleteAssignThenGet,
  deleteContestThenGet,
  deleteQuizThenGet,
  deleteSectionThenGet,
  deleteVideoThenGet,
  getAssign,
  getVideo,
  setCurrSection,
  setCurrVid,
  startLiveQA,
} from "../../RTK/Slices/CourseSlice";
import { useDispatch, useSelector } from "react-redux";
import "../ContentList/ContentList.css";
import vidIcon from "../../assets/ui-element.png";
import quizIcon from "../../assets/speech-bubble.png";
import assignIcon from "../../assets/assign.png";
import secIcon from "../../assets/sections.png";
import delIcon from "../../assets/trash.png";
import pendingIcon from "../../assets/pending.png";
import passIcon from "../../assets/accept.png";
import failIcon from "../../assets/decline.png";
import contestIcon from "../../assets/trophy.png";
import { useNavigate } from "react-router-dom";
import encodeFileToBase64 from "../../utils/EncodeMedia";

const ContentList = ({ course }) => {
  const user = useSelector((state) => state.Authorization);
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
  const [showAddContestSection, setShowAddContestSection] = useState(false);
  const [showAddSectionForm, setShowAddSectionForm] = useState(false);
  const [showAddInstructorForm, setShowAddInstructorForm] = useState(false);

  const [newInstructor, setNewInstructor] = useState("");
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newQuizTitle, setNewQuizTitle] = useState("");
  const [newQuizDuration, setNewQuizDuration] = useState("");
  const [newQuizTotalMarks, setNewQuizTotalMarks] = useState("");
  const [newQuizPassingMarks, setNewQuizPassingMarks] = useState("");
  const [quizQuestions, setQuizQuestions] = useState([]);

  const [newContestTitle, setNewContestTitle] = useState("");
  const [newContestDuration, setNewContestDuration] = useState("");
  const [newContestTotalMarks, setNewContestTotalMarks] = useState("");
  const [newContestPassingMarks, setNewContestPassingMarks] = useState("");
  const [newContestDiscount, setNewContestDiscount] = useState("");
  const [contestQuestions, setContestQuestions] = useState([]);

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
    console.log(fetchedVideo);
  };

  const displayQuiz = (quiz, quizId, secId) => {
    if (
      isStudent &&
      (quiz?.student.pass !== null || quiz?.student.status !== "pending")
    )
      return;
    const sec = course.sections.find((el) => el.coursesectionid === secId);
    updateCurrentSection(sec);
    navigate(`/course/${course.courseid}/quiz/${quizId}/${roleIndex}`);
  };

  const displayAssign = (assignment, assignId, secId) => {
    if (
      isStudent &&
      (assignment?.student.passfail !== null ||
        assignment?.student.status === "submitted")
    )
      return;
    const sec = course.sections.find((el) => el.coursesectionid === secId);
    updateCurrentSection(sec);
    if (isStudent)
      navigate(`/course/${course.courseid}/sec/${secId}/assign/${assignId}`);
    else
      navigate(
        `/course/${course.courseid}/sec/${secId}/editAssign/${assignId}`
      );
  };

  const displayContest = (contest, contestId) => {
    if (
      isStudent &&
      (contest?.student.pass !== null || contest?.student.status !== "pending")
    )
      return;
    navigate(`/course/${course.courseid}/contest/${contestId}/${roleIndex}`);
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
  const handleAddInstructor = (e) => {
    e.preventDefault();
    console.log("Adding Instructor:", newInstructor);
    const data = {
      courseID: course.courseid,
      instructors: [newInstructor],
    };
    dispatch(addInstructorToCourse(data));
    setShowAddInstructorForm(false);
    setNewInstructor("");
  };

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
  const handleAddVideo = async (e, sectionId) => {
    e.preventDefault();
    console.log("Adding Video to Section:", sectionId, newVideoTitle);
    setShowAddVideoSection(null);
    console.log(e.target[1].files);
    const videoDuration = await getVideoDuration(e.target[1].files[0]);
    console.log(videoDuration);
    const vidEncoded = await encodeFileToBase64(e.target[1].files[0]);
    const newVid = {
      videos: [
        {
          video: vidEncoded,
          title: newVideoTitle,
          section_id: sectionId,
          duration: Math.ceil(+videoDuration),
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

  const handleAddContest = (e) => {
    e.preventDefault();
    console.log(
      "Adding Contest to Section:",
      newContestTitle,
      newContestDuration,
      newContestTotalMarks,
      newContestPassingMarks,
      contestQuestions
    );
    const newContest = {
      title: newContestTitle,
      quizDuration: Number(newContestDuration),
      totalMarks: Number(newContestTotalMarks),
      passingMarks: Number(newContestPassingMarks),
      questions: contestQuestions,
      courseId: course.courseid,
      discount: Number(newContestDiscount),
    };
    dispatch(addContestThenGet(newContest));
    setShowAddContestSection(null);
    setNewContestTitle("");
    setNewContestDuration("");
    setNewContestTotalMarks("");
    setNewContestPassingMarks("");
    setContestQuestions([]);
  };

  const handleAddQuestionToQuiz = () => {
    setQuizQuestions([
      ...quizQuestions,
      {
        questiontext: "",
        choices: ["", "", "", ""],
        correctanswerindex: "",
      },
    ]);
  };

  const updateQuizQuestion = (index, field, value) => {
    const updatedQuestions = [...quizQuestions];
    if (field === "questiontext") {
      updatedQuestions[index].questiontext = value;
    } else if (field === "correctanswerindex") {
      updatedQuestions[index].correctanswerindex = Number(value);
    } else {
      updatedQuestions[index].choices[field] = value;
    }
    setQuizQuestions(updatedQuestions);
  };

  const handleAddQuestionToContest = () => {
    setContestQuestions([
      ...contestQuestions,
      {
        questiontext: "",
        choices: ["", "", "", ""],
        correctanswerindex: "",
      },
    ]);
  };

  const updateContestQuestion = (index, field, value) => {
    const updatedQuestions = [...contestQuestions];
    if (field === "questiontext") {
      updatedQuestions[index].questiontext = value;
    } else if (field === "correctanswerindex") {
      updatedQuestions[index].correctanswerindex = Number(value);
    } else {
      updatedQuestions[index].choices[field] = value;
    }
    setContestQuestions(updatedQuestions);
  };

  const handleDeleteSection = (sectionId) => {
    const data = {
      sectionId,
      courseId: course.courseid,
    };
    dispatch(deleteSectionThenGet(data)); // Dispatch action to delete the section
    console.log(sectionId);
  };

  const handleDeleteVideo = (videoId) => {
    const data = {
      videoId,
      courseId: course.courseid,
    };
    dispatch(deleteVideoThenGet(data)); // Dispatch action to delete the video
    console.log(videoId);
  };

  const handleDeleteQuiz = (quizId) => {
    const data = {
      quizId,
      courseId: course.courseid,
    };
    dispatch(deleteQuizThenGet(data)); // Dispatch action to delete the quiz
    console.log(quizId);
  };

  const handleDeleteAssignment = (assignmentId) => {
    const data = {
      assignmentId,
      courseId: course.courseid,
    };
    dispatch(deleteAssignThenGet(data)); // Dispatch action to delete the assignment
    console.log(assignmentId);
  };

  const handleDeleteContest = (contestId) => {
    const data = {
      contestId,
      courseId: course.courseid,
    };
    dispatch(deleteContestThenGet(data)); // Dispatch action to delete the assignment
    console.log(contestId);
  };

  const handleLiveQA = () => {
    dispatch(startLiveQA(course.courseid));
    navigate(`/liveqa/${course.courseid}`);
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
              <div className="right-side">
                {isTopInstructor && (
                  <img
                    src={delIcon}
                    alt="Delete Icon"
                    className="lesson-icon"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event bubbling
                      handleDeleteSection(module.coursesectionid); // Delete Section
                    }}
                  />
                )}
              </div>
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
                    <div className="right-side">
                      <span>{video.videoduration}</span>
                      {isTopInstructor && (
                        <img
                          src={delIcon}
                          alt="Delete Icon"
                          className="lesson-icon"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event bubbling
                            handleDeleteVideo(video.videoid); // Delete Video
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
                {module.quizzes.map((quiz) => (
                  <div
                    key={quiz.quizexamid}
                    className="lesson"
                    onClick={() => {
                      displayQuiz(
                        quiz,
                        quiz.quizexamid,
                        module.coursesectionid
                      );
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
                    <div className="right-side">
                      <span>{quiz.duration}</span>
                      {isStudent && quiz?.student.pass === true && (
                        <img
                          src={passIcon}
                          alt="Pass Icon"
                          className="lesson-icon"
                        />
                      )}
                      {isStudent && quiz?.student.pass === false && (
                        <img
                          src={failIcon}
                          alt="Fail Icon"
                          className="lesson-icon"
                        />
                      )}
                      {isTopInstructor && (
                        <img
                          src={delIcon}
                          alt="Delete Icon"
                          className="lesson-icon"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event bubbling
                            handleDeleteQuiz(quiz.quizexamid); // Delete Quiz
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
                {module.assignments.assignment.map((assignment) => (
                  <div
                    key={assignment.assignmentid}
                    className="lesson"
                    onClick={() => {
                      displayAssign(
                        assignment,
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
                    <div className="right-side">
                      <span>{assignment.duration}</span>

                      {isStudent &&
                        assignment?.student.passfail === null &&
                        assignment?.student.status === "submitted" && (
                          <img
                            src={pendingIcon}
                            alt="Pending Icon"
                            className="lesson-icon"
                          />
                        )}
                      {isStudent && assignment?.student.passfail === true && (
                        <img
                          src={passIcon}
                          alt="Pass Icon"
                          className="lesson-icon"
                        />
                      )}
                      {isStudent && assignment?.student.passfail === false && (
                        <img
                          src={failIcon}
                          alt="Fail Icon"
                          className="lesson-icon"
                        />
                      )}
                      {isTopInstructor && (
                        <img
                          src={delIcon}
                          alt="Delete Icon"
                          className="lesson-icon"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event bubbling
                            handleDeleteAssignment(assignment.assignmentid); // Delete Assignment
                          }}
                        />
                      )}
                    </div>
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
                              required
                              onChange={(e) => setNewVideoTitle(e.target.value)}
                            />
                            <input type="file" required />
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
                          required
                          onChange={(e) => setNewQuizTitle(e.target.value)}
                        />
                        <input
                          type="number"
                          placeholder="Quiz Duration in mins"
                          value={newQuizDuration}
                          required
                          onChange={(e) => setNewQuizDuration(e.target.value)}
                        />
                        <input
                          type="number"
                          placeholder="Quiz Total Marks"
                          value={newQuizTotalMarks}
                          required
                          onChange={(e) => setNewQuizTotalMarks(e.target.value)}
                        />
                        <input
                          type="number"
                          placeholder="Quiz Passing Marks"
                          value={newQuizPassingMarks}
                          required
                          onChange={(e) =>
                            setNewQuizPassingMarks(e.target.value)
                          }
                        />
                        {quizQuestions.map((question, index) => (
                          <div key={index} className="inline-form">
                            <input
                              type="text"
                              placeholder="Question Text"
                              value={question.questiontext}
                              onChange={(e) =>
                                updateQuizQuestion(
                                  index,
                                  "questiontext",
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
                              value={question.correctanswerindex}
                              onChange={(e) =>
                                updateQuizQuestion(
                                  index,
                                  "correctanswerindex",
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
                  required
                  onChange={(e) => setNewSectionTitle(e.target.value)}
                />
                <button className="save-btn" type="submit">
                  Save Section
                </button>
              </form>
            )}
          </div>
        )}
        <h2 className="h2">Course Contests</h2>
        <div className="modules">
          {course.contests.map((contest) => (
            <div key={contest.contestexamid} className="module">
              <div
                className="module-header"
                onClick={() => displayContest(contest, contest.contestexamid)}
              >
                <div className="lesson-icon-and-title">
                  <img
                    src={contestIcon}
                    alt="Contest Icon"
                    className="lesson-icon"
                  />
                  <h3>{contest.title}</h3>
                </div>
                <div className="right-side">
                  <span>{contest.duration}</span>
                  {isStudent && contest?.student.pass === true && (
                    <img
                      src={passIcon}
                      alt="Pass Icon"
                      className="lesson-icon"
                    />
                  )}
                  {isStudent && contest?.student.pass === false && (
                    <img
                      src={failIcon}
                      alt="Fail Icon"
                      className="lesson-icon"
                    />
                  )}
                  {isTopInstructor && (
                    <img
                      src={delIcon}
                      alt="Delete Icon"
                      className="lesson-icon"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event bubbling
                        handleDeleteContest(contest.contestexamid); // Delete Section
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="btns">
          {isTopInstructor && (
            <>
              <button
                className="add-btn"
                onClick={() => setShowAddContestSection(!showAddContestSection)}
              >
                Add Contest
              </button>
              {showAddContestSection && (
                <form
                  className="inline-form"
                  onSubmit={(e) => handleAddContest(e)}
                >
                  <input
                    type="text"
                    placeholder="Contest Title"
                    required
                    value={newContestTitle}
                    onChange={(e) => setNewContestTitle(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Contest Duration in mins"
                    required
                    value={newContestDuration}
                    onChange={(e) => setNewContestDuration(e.target.value)}
                  />
                  <input
                    type="number"
                    required
                    placeholder="Contest Total Marks"
                    value={newContestTotalMarks}
                    onChange={(e) => setNewContestTotalMarks(e.target.value)}
                  />
                  <input
                    required
                    type="number"
                    placeholder="Contest Passing Marks"
                    value={newContestPassingMarks}
                    onChange={(e) => setNewContestPassingMarks(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Contest Discount"
                    value={newContestDiscount}
                    onChange={(e) => setNewContestDiscount(e.target.value)}
                    required
                  />
                  {contestQuestions.map((question, index) => (
                    <div key={index} className="inline-form">
                      <input
                        type="text"
                        placeholder="Question Text"
                        value={question.questiontext}
                        onChange={(e) =>
                          updateContestQuestion(
                            index,
                            "questiontext",
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
                            updateContestQuestion(index, i, e.target.value)
                          }
                        />
                      ))}
                      <input
                        type="text"
                        placeholder="Correct Answer Index"
                        value={question.correctanswerindex}
                        onChange={(e) =>
                          updateContestQuestion(
                            index,
                            "correctanswerindex",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  ))}
                  <button
                    className="add-btn"
                    type="button"
                    onClick={handleAddQuestionToContest}
                  >
                    Add Question
                  </button>
                  <button className="save-btn" type="submit">
                    Save Contest
                  </button>
                </form>
              )}
              {isTopInstructor && (
                <div className="btns">
                  <button
                    className="add-section-btn"
                    onClick={() =>
                      setShowAddInstructorForm(!showAddInstructorForm)
                    }
                  >
                    Add Instructor
                  </button>
                  {showAddInstructorForm && (
                    <form
                      className="inline-form"
                      onSubmit={handleAddInstructor}
                    >
                      <input
                        type="text"
                        placeholder="Instructor UserName"
                        value={newInstructor}
                        required
                        onChange={(e) => setNewInstructor(e.target.value)}
                      />
                      <button className="save-btn" type="submit">
                        Confirm Instructor
                      </button>
                    </form>
                  )}
                  <button className="add-section-btn" onClick={handleLiveQA}>
                    Start Live QA
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentList;
