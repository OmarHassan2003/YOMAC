import React, { useEffect, useState } from "react";
import "./Quiz.css";
import { useParams, useNavigate } from "react-router-dom";
import { getQuizQuestions } from "../../RTK/Slices/QuizSlice";
import { useDispatch, useSelector } from "react-redux";

const Quiz = () => {
  const params = useParams();
  const navigate = useNavigate();
  const currQuizId = params.quizexamid;
  const courseId = params.courseid;
  const { questions } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(getQuizQuestions(currQuizId));
  }, [params.quizexamid]);

  const handleAnswerChange = (questionId, choiceIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: choiceIndex,
    }));
  };

  const handleSubmit = () => {
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
  };

  const handleBackToCourse = () => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="quiz-page">
      {!score && score !== 0 ? (
        <>
          <div className="quiz-header">
            <h1>{"Quiz"}</h1>
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
          <button className="submit-btn" onClick={handleSubmit}>
            Submit Quiz
          </button>
          <button className="back-btn" onClick={handleBackToCourse}>
            Back to Course
          </button>
        </>
      ) : (
        <div className="quiz-result">
          <h1>Quiz Completed!</h1>
          <p>
            You got <strong>{score}</strong> out of{" "}
            <strong>{questions.length}</strong> correct.
          </p>
          <button className="back-btn" onClick={handleBackToCourse}>
            Back to Course
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
