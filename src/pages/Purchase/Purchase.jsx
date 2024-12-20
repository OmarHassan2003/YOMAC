import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import "./Purchase.css";
import { enrollToCourse } from "../../RTK/Slices/CourseSlice";
import { increaseBalance } from "../../RTK/Slices/StudentSlice";

export default function Purchase() {
  const location = useLocation();
  const { course } = location.state || {};
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Course);

  const [showBalanceForm, setShowBalanceForm] = useState(false);
  const [amount, setAmount] = useState("");

  const originalPrice = course.price;
  const discountedPrice = course.discountedPrice;

  const handleCheckout = () => {
    dispatch(enrollToCourse(course.courseid));
  };

  const handleIncreaseBalance = () => {
    if (amount && !isNaN(amount) && amount > 0) {
      dispatch(increaseBalance(Number(amount)));
      setShowBalanceForm(false); // Hide form after increasing balance
      setAmount(""); // Reset input field
    } else {
      alert("Please enter a valid amount.");
    }
  };

  return (
    <div className="course-purchase">
      {data.enrollmentErrorMessage ===
      "student has no enough balance to enroll on this course" ? (
        showBalanceForm ? (
          <div className="balance-form">
            <h1>Increase Your Balance</h1>
            <label htmlFor="amount">Enter Amount:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min="1"
            />
            <div className="form-buttons">
              <button onClick={handleIncreaseBalance}>Add Balance</button>
              <button onClick={() => setShowBalanceForm(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <h1>You don't have enough balance to enroll on this course</h1>
            <button
              className="purchase"
              onClick={() => setShowBalanceForm(true)}
            >
              Increase Balance
            </button>
          </>
        )
      ) : (
        <>
          <img src={course.courseimage} alt={course.title} />
          <div className="course-details">
            <div className="course-first-line">
              <h2 className="course-title">{course.title}</h2>
              <div className="course-price">
                {originalPrice !== discountedPrice ? (
                  <>
                    <h2 className="discounted-price">
                      {discountedPrice
                        ? "E£" + Math.ceil(discountedPrice)
                        : "Free"}
                    </h2>
                    <h2 className="original-price">E£{originalPrice}</h2>
                  </>
                ) : (
                  <h2 className="final-price">E£{originalPrice}</h2>
                )}
              </div>
            </div>
            <h3 className="course-description">{course.description}</h3>
            <h3 className="course-instructor">
              By {course.instructor.instructorname}
            </h3>
            <h3 className="course-rating">⭐ {course.rating}</h3>
            <h3 className="course-duration">{course.duration} total hours</h3>
            <button className="purchase" onClick={() => handleCheckout(course)}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
