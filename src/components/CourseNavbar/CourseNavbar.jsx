import { useEffect, useState } from "react";
import "../CourseNavbar/CourseNavbar.css";
import {
  getVidQA,
  getQAAnswers,
  setfetchedQA,
  postThenGet,
  postStudentAnswerThenGet,
} from "../../RTK/Slices/QASlice";
import { useDispatch, useSelector } from "react-redux";
const CourseNavbar = ({ course }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeQuestion, setActiveQuestion] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [answerText, setAnswerText] = useState("");
  let qa = useSelector((state) => state.qa);
  let { user_id, role } = useSelector((state) => state.Authorization);
  const dispatch = useDispatch();
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handlePostQuestion = () => {
    const data = {
      videoID: course.currVid.videoid,
      question: questionText,
    };
    dispatch(postThenGet(data));
    setQuestionText("");
  };

  const handlePostAnswer = (data) => {
    dispatch(postStudentAnswerThenGet(data));
    setAnswerText("");
  };

  useEffect(() => {
    if (course?.currVid !== null) {
      console.log(course?.currVid);
      dispatch(getVidQA(course.currVid.videoid));
      console.log(qa.qa_questions);
    }
  }, [course.currVid]);

  const toggleAnswers = (qaID) => {
    console.log(qaID);
    dispatch(setfetchedQA(null));
    dispatch(getQAAnswers(qaID));
    console.log(qa.fetchedQA);
    setActiveQuestion(qaID);
  };

  return (
    <div className="belowvid">
      <div className="course-navbar">
        <div
          className={`tab ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => handleTabClick("overview")}
        >
          Overview
        </div>
        {course.currVid !== null && (
          <div
            className={`tab ${activeTab === "q&a" ? "active" : ""}`}
            onClick={() => handleTabClick("q&a")}
          >
            Q&A
          </div>
        )}
        <div
          className={`tab ${activeTab === "reviews" ? "active" : ""}`}
          onClick={() => handleTabClick("reviews")}
        >
          Reviews
        </div>
      </div>
      <div className="navcontent">
        <div
          className={`description ${activeTab !== "overview" ? "hidden" : ""}`}
        >
          <h2>Course Description</h2>
          <p>{course.description}</p>
          <h2>Course Duration</h2>
          <p>{course.duration}</p>
        </div>
        <div
          key={course.currVid?.videoid}
          className={`qna ${activeTab !== "q&a" ? "hidden" : ""}`}
        >
          {qa?.qa_questions.length === 0 && <div>No Questions asked yet</div>}
          {qa?.qa_questions.length !== 0 &&
            qa.qa_questions.map((message) => (
              <div className="qa-item">
                <div
                  key={message.qaid}
                  className="question"
                  onClick={() => toggleAnswers(message.qaid)}
                >
                  <div className="user-info">
                    <div className="user-details">
                      <img
                        src={message.senderstudent.profilepic}
                        alt="User Profile"
                        className="profile-pic"
                      />
                      <p className="user-name">
                        {message.senderstudent.studentname}
                      </p>
                    </div>
                    <div className="message-date">
                      {new Date(message.createdat).toLocaleString()}
                    </div>
                  </div>

                  <div className="message-text">{message.messagetext}</div>
                </div>
                <div
                  className={`answers ${
                    activeQuestion !== message.qaid ? "hidden" : ""
                  }`}
                >
                  {qa?.fetchedQA?.answers.length === 0 && (
                    <div>No Answers yet</div>
                  )}
                  {qa.fetchedQA !== null &&
                    qa?.fetchedQA?.answers.map((answer) => (
                      <div key={answer.messageid} className="answer">
                        <div className="user-info">
                          <div className="user-details">
                            <img
                              src={answer.senderstudent.profilepic}
                              alt="User Profile"
                              className="profile-pic"
                            />
                            <p className="user-name">
                              {answer.senderstudent.studentname}
                            </p>
                          </div>
                          <div className="message-date">
                            {new Date(answer.createdat).toLocaleString()}
                          </div>
                        </div>
                        <div className="message-text">{answer.messagetext}</div>
                      </div>
                    ))}
                  <div className="qa-input-container">
                    <input
                      type="text"
                      className="qa-textbox"
                      placeholder="Type your answer here..."
                      value={answerText}
                      onChange={(e) => setAnswerText(e.target.value)}
                    ></input>
                    <button
                      className="qa-submit-button"
                      onClick={() => {
                        handlePostAnswer({
                          videoID: course.currVid.videoid,
                          answerToID: message.senderstudent.studentid,
                          answer: answerText,
                          QAID: message.qaid,
                        });
                      }}
                      disabled={!answerText.trim()}
                    >
                      Post Answer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          <div className="qa-input-container">
            <input
              type="text"
              className="qa-textbox"
              placeholder="Type your question here..."
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            ></input>
            <button
              className="qa-submit-button"
              onClick={handlePostQuestion}
              disabled={!questionText.trim()}
            >
              Post Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseNavbar;
