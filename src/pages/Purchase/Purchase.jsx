import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./Purchase.css";
import { enrollToCourse } from "../../RTK/Slices/CourseSlice";
import { getStudent, increaseBalance } from "../../RTK/Slices/StudentSlice";

export default function Purchase() {
  const location = useLocation();
  const { course } = location.state || {};
  console.log(course);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Course);
  let userDataBalance = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(getStudent());
    setAmount(placeholder);
  }, []);

  useEffect(() => {
    setPurchaseSuccessMessage("");
  }, []);

  userDataBalance = userDataBalance.object.balance;

  const [showBalanceForm, setShowBalanceForm] = useState(false);
  const [amount, setAmount] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [purchaseSuccessMessage, setPurchaseSuccessMessage] = useState("");

  const originalPrice = course.price;
  const discountedPrice = course.discountedPrice;
  const navigate = useNavigate();
  const placeholder = `${
    originalPrice !== discountedPrice
      ? discountedPrice - userDataBalance
      : originalPrice - userDataBalance
  }`;

  const handleCheckout = () => {
    dispatch(
      enrollToCourse({
        courseID: course.courseid,
        offers: course.offers.length !== 0 ? course.offers : [],
      })
    )
      .unwrap()
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setPurchaseSuccessMessage(
            `You have successfully enrolled in ${course.title}!`
          );
          setTimeout(() => {
            navigate(`/course/${course.courseid}`);
          }, 3000);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleIncreaseBalance = () => {
    if (amount && !isNaN(amount) && amount > 0) {
      dispatch(increaseBalance(Number(amount)));
      setSuccessMessage(`Your balance has been increased by E£${amount}.`);
      setShowBalanceForm(false);
      setAmount("");
      setTimeout(() => {
        dispatch(getStudent());
        setSuccessMessage("");
        handleCheckout();
      }, 3000);
    } else {
      alert("Please enter a valid amount.");
    }
  };

  return (
    <div className="course-purchase">
      {successMessage && (
        <div className="success-message">
          <h2>{successMessage}</h2>
        </div>
      )}
      {purchaseSuccessMessage && (
        <div className="success-message">
          <h2>{purchaseSuccessMessage}</h2>
        </div>
      )}
      {data.enrollmentErrorMessage ===
      "student has no enough balance to enroll on this course" ? (
        showBalanceForm ? (
          <div className="balance-form">
            <h1 style={{ marginBottom: "20px" }}>Increase Your Balance</h1>
            <label
              style={{ marginRight: "10px", marginBottom: "15px" }}
              htmlFor="amount"
            >
              Enter Amount:
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={placeholder}
              min="1"
              style={{ padding: "5px" }}
            />
            <div className="form-buttons">
              <button className="purchase" onClick={handleIncreaseBalance}>
                Add Balance
              </button>
              <button
                className="purchase"
                onClick={() => setShowBalanceForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1>You don't have enough balance to enroll to this course</h1>
            <button
              className="purchase"
              onClick={() => setShowBalanceForm(true)}
            >
              Increase Balance
            </button>
          </>
        )
      ) : (
        successMessage == "" &&
        purchaseSuccessMessage == "" && (
          <>
            <img src={course.courseimage} alt={course.title} />
            <div className="search-course-details">
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
              <h3 className="course-ratingg">⭐ {course.rating}</h3>
              <h3 className="course-duration">{course.duration} total hours</h3>
              <button
                className="purchase"
                onClick={() => handleCheckout(course)}
              >
                Checkout
              </button>
            </div>
          </>
        )
      )}
    </div>
  );
}
