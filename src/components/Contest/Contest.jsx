import React, { useEffect, useState } from "react";
import "./Contest.css";
import { useParams, useNavigate } from "react-router-dom";
import { getContest, submitContest } from "../../RTK/Slices/QuizSlice";
import { useDispatch, useSelector } from "react-redux";

const Contest = () => {
  const params = useParams();
  const navigate = useNavigate();
  //   const currQuizId = params.quizexamid;
  const courseId = params.courseid;
  const role = Number(params.roleindex);
  const { quiz, questions } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [error, setError] = useState("");

  // Editing states for instructors
  const [editableQuestions, setEditableQuestions] = useState([]);
  const [duration, setDuration] = useState(0);
  const [maxMarks, setMaxMarks] = useState(0);
  const [passingMarks, setPassingMarks] = useState(0);
  const [quizTitle, setQuizTitle] = useState("");

  console.log(quiz, questions);
  useEffect(() => {
    dispatch(getContest(params.contestid));
  }, [dispatch, params.contestid]);

  useEffect(() => {
    if (questions.length && quiz) {
      setEditableQuestions(JSON.parse(JSON.stringify(questions))); // Deep clone
      setDuration(Number(quiz.duration)); // Set from quiz object
      setMaxMarks(Number(quiz.totalmarks));
      setPassingMarks(Number(quiz.passingmarks));
      setQuizTitle(quiz.title); // Set the title for editing
    }
  }, [questions, quiz]);

  const handleAnswerChange = (questionId, choiceIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: choiceIndex,
    }));
  };

  const handleSubmitQuiz = () => {
    if (Object.keys(selectedAnswers).length !== questions.length) {
      setError("Please answer all questions.");
      return;
    }
    setError("");

    let correctCount = 0;
    questions.forEach((question) => {
      if (
        selectedAnswers[question.questionid] === question.correctanswerindex
      ) {
        correctCount += 1;
      }
    });
    setScore(correctCount);
    let grade = (correctCount / questions.length) * quiz.totalmarks;
    dispatch(
      submitContest({
        contestId: params.contestid,
        grade,
        pass: grade >= quiz.passingmarks,
        discount: +quiz.discount,
      })
    );
  };

  const handleBackToCourse = () => {
    navigate(`/course/${courseId}`);
  };

  const handleEditQuestion = (index, field, value) => {
    const updatedQuestions = [...editableQuestions];
    if (field === "questiontext") {
      updatedQuestions[index].questiontext = value;
    } else if (field === "correctanswerindex") {
      updatedQuestions[index].correctanswerindex = Number(value);
    } else {
      updatedQuestions[index].choices[field] = value;
    }
    setEditableQuestions(updatedQuestions);
  };

  const handleSubmitChanges = () => {
    const editedQuiz = {
      quizID: params.quizexamid,
      title: quizTitle,
      quizDuration: duration,
      totalMarks: maxMarks,
      passingMarks: passingMarks,
      questions: editableQuestions,
    };
    const obj = { quiz: editedQuiz };
    console.log(obj);
    dispatch(updateQuizThenGet(obj));
  };

  return (
    <div className="quiz-page">
      {role === 0 ? (
        // STUDENT VIEW
        !score && score !== 0 ? (
          <>
            <div className="quiz-header">
              <h1>{quiz?.title}</h1>
              <p>
                Duration: <strong>{quiz?.duration} minutes</strong> | Total
                Marks: <strong>{quiz?.totalmarks}</strong>
              </p>
            </div>
            <div className="quiz-questions">
              {questions?.map((question, index) => (
                <div className="quiz-question" key={question.questionid}>
                  <p className="question-text">
                    <strong>
                      {index + 1}. {question.questiontext}
                    </strong>
                  </p>
                  <div className="question-choices">
                    {question.choices.map((choice, choiceIndex) => (
                      <label key={choiceIndex} className="choice-container">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={choiceIndex}
                          onChange={() =>
                            handleAnswerChange(question.questionid, choiceIndex)
                          }
                        />
                        <span className="choice-text">{choice}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {error && <p className="error-message">{error}</p>}
            <button className="submit-btn" onClick={handleSubmitQuiz}>
              Submit Contest
            </button>
          </>
        ) : (
          <div className="quiz-result">
            <h1>Quiz Completed!</h1>
            <p>
              You got <strong>{score}</strong> out of{" "}
              <strong>{questions.length}</strong> correct.
            </p>
          </div>
        )
      ) : (
        // INSTRUCTOR VIEW
        <div className="progress-container">
          <h2 className="progress-title">Students' Progress</h2>
          <div className="student-cards">
            {quiz?.data?.map((datas) => (
              <div className="student-card" key={datas.student.studentid}>
                <img
                  src={datas.student.profilepic}
                  alt={`${datas.student.studentname}'s profile`}
                  className="student-pic"
                />
                <div className="student-info">
                  <h3 className="student-name">{datas.student.studentname}</h3>
                  <p className="student-email">{datas.student.email}</p>
                  <p className="participation">
                    <strong>Participation: </strong>
                    {datas.status !== "pending" ? "Yes" : "No"}
                  </p>
                  {datas?.student.status !== "pending" && (
                    <>
                      <p className="grade">
                        <strong>Grade: </strong>
                        {datas.grade === null ? "Not graded" : datas.grade}
                      </p>
                      <p className="pass-fail">
                        {datas?.pass === true && "Passed"}
                        {datas?.pass === null && " "}
                        {datas?.pass === false && "Failed"}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <button className="back-btn" onClick={handleBackToCourse}>
        Back to Course
      </button>
    </div>
  );
};

export default Contest;
