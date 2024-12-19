import React, { useEffect, useState } from "react";
import "./Quiz.css";
import { useParams, useNavigate } from "react-router-dom";
import {
  getQuizQuestions,
  submitQuiz,
  updateQuiz,
  updateQuizThenGet,
} from "../../RTK/Slices/QuizSlice";
import { useDispatch, useSelector } from "react-redux";

const Quiz = () => {
  const params = useParams();
  const navigate = useNavigate();
  const currQuizId = params.quizexamid;
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

  useEffect(() => {
    dispatch(getQuizQuestions(currQuizId));
  }, [dispatch, currQuizId]);

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
      submitQuiz({
        quizId: currQuizId,
        grade,
        pass: grade >= quiz.passingmarks,
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
              {questions.map((question, index) => (
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
              Submit Quiz
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
        <>
          <div className="quiz-header">
            <h1>Edit Quiz</h1>
            <div className="quiz-title-edit">
              <label>
                Quiz Title:{" "}
                <input
                  type="text"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                />
              </label>
            </div>
            <p>Edit the details and questions for this quiz.</p>
          </div>
          <div className="quiz-settings">
            <label>
              Duration (minutes):{" "}
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </label>
            <label>
              Max Marks:{" "}
              <input
                type="number"
                value={maxMarks}
                onChange={(e) => setMaxMarks(e.target.value)}
              />
            </label>
            <label>
              Passing Marks:{" "}
              <input
                type="number"
                value={passingMarks}
                onChange={(e) => setPassingMarks(e.target.value)}
              />
            </label>
          </div>
          <div className="quiz-questions">
            {editableQuestions.map((question, index) => (
              <div className="quiz-question" key={index}>
                <input
                  type="text"
                  value={question.questiontext}
                  onChange={(e) =>
                    handleEditQuestion(index, "questiontext", e.target.value)
                  }
                />
                <div className="question-choices">
                  {question.choices.map((choice, choiceIndex) => (
                    <input
                      key={choiceIndex}
                      type="text"
                      value={choice}
                      onChange={(e) =>
                        handleEditQuestion(index, choiceIndex, e.target.value)
                      }
                    />
                  ))}
                </div>
                <label>
                  Correct Answer Index:{" "}
                  <input
                    type="number"
                    value={question.correctanswerindex}
                    onChange={(e) =>
                      handleEditQuestion(
                        index,
                        "correctanswerindex",
                        e.target.value
                      )
                    }
                  />
                </label>
              </div>
            ))}
          </div>
          <button className="submit-btn" onClick={handleSubmitChanges}>
            Submit Changes
          </button>
        </>
      )}
      <button className="back-btn" onClick={handleBackToCourse}>
        Back to Course
      </button>
    </div>
  );
};

export default Quiz;
