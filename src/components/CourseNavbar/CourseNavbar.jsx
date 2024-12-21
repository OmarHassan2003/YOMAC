import { useEffect, useState } from "react";
import "../CourseNavbar/CourseNavbar.css";
import {
  getVidQA,
  getQAAnswers,
  setfetchedQA,
  postThenGet,
  postStudentAnswerThenGet,
  postInstructorAnswerThenGet,
  deleteMessageThenGet,
  deleteQAThenGet,
} from "../../RTK/Slices/QASlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourseFeedbackThenGet,
  addInstructorFeedbackThenGet,
  getCourseFeedback,
  getInstructorFeedback,
} from "../../RTK/Slices/FeedbackSlice";
import delIcon from "../../assets/trash.png";
const CourseNavbar = ({ course }) => {
  const user = useSelector((state) => state.Authorization);
  const role = user.role;
  let isStudent = false;
  let isInstructor = false;
  let isTopInstructor = false;
  if (role === "student") isStudent = true;
  else {
    isInstructor = true;
    if (user.user_id == course.topinstructorid) isTopInstructor = true;
  }
  const [activeTab, setActiveTab] = useState("overview");
  const [activeQuestion, setActiveQuestion] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");
  const [reviewTextInst, setReviewTextInst] = useState("");
  const [ratingInst, setRatingInst] = useState("");
  let qa = useSelector((state) => state.qa);
  const dispatch = useDispatch();
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const dataFeed = useSelector((state) => state.feedback);
  useEffect(() => {
    dispatch(getCourseFeedback(course.courseid));
    dispatch(getInstructorFeedback(course.topinstructorid));
  }, []);
  // console.log(dataFeed);

  const handlePostQuestion = () => {
    const data = {
      videoID: course.currVid.videoid,
      question: questionText,
    };
    dispatch(postThenGet(data));
    setQuestionText("");
  };

  const handlePostAnswer = (data) => {
    if (role == "student") dispatch(postStudentAnswerThenGet(data));
    else dispatch(postInstructorAnswerThenGet(data));
    setAnswerText("");
  };
  const handlePostReview = () => {
    const ratings = +rating;
    if (ratings > 5 || ratings < 1) {
      alert("Rating should be between 1 and 5");
      setReviewText("");
      setRating("");
      return;
    }
    const data = {
      course_id: course.courseid,
      rating: +ratings,
      review: reviewText,
    };
    dispatch(addCourseFeedbackThenGet(data));
    setReviewText("");
    setRating("");
  };
  const handlePostReviewInst = () => {
    const ratings = +ratingInst;
    if (ratings > 5 || ratings < 1) {
      alert("Rating should be between 1 and 5");
      setReviewText("");
      setRating("");
      return;
    }
    const data = {
      instructor_id: course.topinstructorid,
      rating: +ratings,
      review: reviewTextInst,
    };
    dispatch(addInstructorFeedbackThenGet(data));
    setReviewTextInst("");
    setRatingInst("");
  };

  useEffect(() => {
    if (course?.currVid !== null) {
      // console.log(course?.currVid);
      dispatch(getVidQA(course.currVid.videoid));
      // console.log(qa.qa_questions);
    }
  }, [course.currVid]);

  const toggleAnswers = (qaID) => {
    console.log(qaID);
    dispatch(setfetchedQA(null));
    dispatch(getQAAnswers(qaID));
    console.log(qa.fetchedQA);
    setActiveQuestion(qaID);
  };
  const handleDeleteQA = (qaID) => {
    console.log(qaID);
    const data = {
      qaID,
      videoID: course.currVid.videoid,
    };
    dispatch(deleteQAThenGet(data));
  };
  const handleDeleteAnswer = (messageID, qaID) => {
    console.log(messageID);
    const data = {
      message_id: messageID,
      course_id: course.courseid,
      qaID,
    };
    dispatch(deleteMessageThenGet(data));
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
        <div
          className={`tab ${activeTab === "reviewsInst" ? "active" : ""}`}
          onClick={() => handleTabClick("reviewsInst")}
        >
          Reviews on Instructor
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
          {isInstructor && course.seenstatus == "private" && (
            <>
              <h2>Course ID</h2>
              <p>{course.courseid}</p>
            </>
          )}
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
                        className="profile-pic-message"
                      />
                      <p className="user-name">
                        {message.senderstudent.studentname}
                      </p>
                    </div>
                    <div className="right">
                      <div className="message-date">
                        {new Date(message.createdat).toLocaleString()}
                      </div>
                      {(isTopInstructor ||
                        +user.user_id === +message.senderstudent.studentid) && (
                        <img
                          src={delIcon}
                          alt="Delete Icon"
                          className="lesson-icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteQA(message.qaid);
                          }}
                        />
                      )}
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
                    qa?.fetchedQA?.answers.map((answer) => {
                      let senderRole;
                      if (answer.senderstudentid === null)
                        senderRole = "instructor";
                      else if (answer.senderinstructorid === null)
                        senderRole = "student";

                      return (
                        <div key={answer.messageid} className="answer">
                          <div className="user-info">
                            <div className="user-details">
                              <img
                                src={
                                  senderRole === "instructor"
                                    ? answer.senderinstructor.profilepic
                                    : answer.senderstudent.profilepic
                                }
                                alt="User Profile"
                                className="profile-pic-message"
                              />
                              <p className="user-name">
                                {senderRole === "instructor"
                                  ? answer.senderinstructor.instructorname
                                  : answer.senderstudent.studentname}
                              </p>
                            </div>
                            <div className="right">
                              <div className="message-date">
                                {new Date(answer.createdat).toLocaleString()}
                              </div>
                              {(isTopInstructor ||
                                (isStudent &&
                                  user.user_id ==
                                    answer?.senderstudent?.studentid) ||
                                (isInstructor &&
                                  user.user_id ==
                                    answer?.senderinstructor
                                      ?.instructorid)) && (
                                <img
                                  src={delIcon}
                                  alt="Delete Icon"
                                  className="lesson-icon"
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent event bubbling
                                    handleDeleteAnswer(
                                      answer.messageid,
                                      message.qaid
                                    );
                                  }}
                                />
                              )}
                            </div>
                          </div>
                          <div className="message-text">
                            {answer.messagetext}
                          </div>
                        </div>
                      );
                    })}
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
          {isStudent && (
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
          )}
        </div>
        <div className={`reviews ${activeTab !== "reviews" ? "hidden" : ""}`}>
          {dataFeed?.courses?.length === 0 ? (
            <div>No Reviews yet</div>
          ) : (
            dataFeed.courses.map((review) => {
              return (
                <div className="qa-item">
                  <div className="user-info">
                    <div className="user-details">
                      <img
                        src={review.profilepic}
                        alt="User Profile"
                        className="profile-pic"
                      />
                      <p className="user-name">{review.studentname}</p>
                    </div>
                    <div className="message-text">{review.review}</div>
                    <div className="message-text">{review.rating}</div>
                    <div className="message-date">
                      {new Date(review.createdat).toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          {isStudent && (
            <div className="qa-input-container">
              <input
                type="text"
                className="qa-textbox"
                placeholder="Type your Review here..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></input>
              <input
                type="text"
                className="qa-textbox"
                placeholder="Type your Rating here..."
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              ></input>
              <button
                className="qa-submit-button"
                onClick={handlePostReview}
                disabled={!reviewText.trim()}
              >
                Post Review
              </button>
            </div>
          )}
        </div>
        <div
          className={`reviews ${activeTab !== "reviewsInst" ? "hidden" : ""}`}
        >
          {dataFeed?.instructor?.length === 0 ? (
            <div>No Reviews yet</div>
          ) : (
            dataFeed.instructor.map((review) => {
              return (
                <div className="qa-item">
                  <div className="user-info">
                    <div className="user-details">
                      <img
                        src={review.profilepic}
                        alt="User Profile"
                        className="profile-pic"
                      />
                      <p className="user-name">{review.studentname}</p>
                    </div>
                    <div className="message-text">{review.review}</div>
                    <div className="message-text">{review.rating}</div>
                    <div className="message-date">
                      {new Date(review.createdat).toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          {isStudent && (
            <div className="qa-input-container">
              <input
                type="text"
                className="qa-textbox"
                placeholder="Type your Review here..."
                value={reviewTextInst}
                onChange={(e) => setReviewTextInst(e.target.value)}
              ></input>
              <input
                type="text"
                className="qa-textbox"
                placeholder="Type your Rating here..."
                value={ratingInst}
                onChange={(e) => setRatingInst(e.target.value)}
              ></input>
              <button
                className="qa-submit-button"
                onClick={handlePostReviewInst}
                disabled={!reviewTextInst.trim()}
              >
                Post Review
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseNavbar;
