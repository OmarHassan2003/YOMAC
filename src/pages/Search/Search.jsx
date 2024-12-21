import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoursesByCategory,
  getCoursesByTitle,
  setCourses,
} from "../../RTK/Slices/SearchSlice";
import { useEffect, useState } from "react";
import "./Search.css";
import { getCategories } from "../../RTK/Slices/CategorySlice";
export default function Search() {
  const authData = useSelector((state) => state.Authorization);
  const isLoggedIn = authData.token !== null;
  const isStudent = authData.role === "student";
  const { type, searchQuery } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.category);
  const { courses } = useSelector((state) => state.Search);
  const [maxOffer, setMaxOffer] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(setCourses());
  }, [dispatch]);

  const handlePurchase = (course) => {
    const discountedPrice = calculateDisplayPrice(course.price, course.offers);
    navigate("/purchase", {
      state: {
        course: {
          ...course,
          originalPrice: course.price,
          discountedPrice,
          maxOffer,
        },
      },
    });
  };

  useEffect(() => {
    if (type === "title") {
      dispatch(getCoursesByTitle(searchQuery));
      // if (type === "title") {
      //   dispatch(getCoursesByTitle(searchQuery));
      //   let rightCategory;
      //   console.log(courses.length);
      //   if (courses.length === 0) {
      //     rightCategory = data.categories.findIndex((category) => {
      //       console.log(category.categorytext.toLowerCase(), searchQuery);
      //       return category.categorytext.toLowerCase() === searchQuery;
      //     });
      //     if (rightCategory !== -1) {
      //       dispatch(
      //         getCoursesByCategory(data.categories[rightCategory].categoryid)
      //       );
      //     }
      //   }
      // } else {
    } else {
      const rightCategory = data.categories.find(
        (category) => category.categorytext === searchQuery
      );
      if (rightCategory) {
        dispatch(getCoursesByCategory(rightCategory.categoryid));
      }
    }
  }, [searchQuery, type, dispatch, data.categories]);

  useEffect(() => {
    setMaxOffer(maxOffer);
  }, [maxOffer]);

  const calculateDisplayPrice = (price, offers) => {
    if (!offers || offers.length === 0) return price;
    let maxOffer = offers[0];
    for (let i = 1; i < offers.length; i++) {
      if (offers[i].discount > maxOffer.discount) {
        maxOffer = offers[i];
      }
    }
    console.log(maxOffer);

    return maxOffer.discount >= 100
      ? 0
      : ((100 - maxOffer.discount) / 100) * price;
  };

  return courses.length === 0 ? (
    <div className="no-results-container">
      <h1>
        Sorry, we couldn't find any results for{" "}
        <strong>{`"${searchQuery}"`}</strong>
      </h1>
      <p>Try adjusting your search. Here are some ideas:</p>
      <ul>
        <li>Make sure all words are spelled correctly</li>
        <li>Try different search terms</li>
        <li>Try more general search terms</li>
      </ul>
    </div>
  ) : (
    <div className="search-container" style={{ marginTop: "40px" }}>
      <ul className="courses-list">
        {courses.map((course, index) => {
          const originalPrice = course.price;
          const discountedPrice = calculateDisplayPrice(
            course.price,
            course.offers
          );

          return (
            <li key={index} className="course-card">
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
                <h3 className="course-duration">
                  {course.duration} total hours
                </h3>
                {isStudent && (
                  <button
                    className="purchase"
                    onClick={() => handlePurchase(course)}
                  >
                    Purchase Course
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
