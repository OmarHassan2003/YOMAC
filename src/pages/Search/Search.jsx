import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoursesByCategory,
  getCoursesByTitle,
  setCourses,
} from "../../RTK/Slices/SearchSlice";
import { useEffect } from "react";
import "./Search.css";
import { getCategories } from "../../RTK/Slices/CategorySlice";

export default function Search() {
  const { type, searchQuery } = useParams();
  console.log(type, searchQuery);
  const dispatch = useDispatch();
  let data = useSelector((state) => state.category);
  const { courses } = useSelector((state) => state.Search);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    dispatch(setCourses());
  }, []);

  useEffect(() => {
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
    if (type === "title") {
      dispatch(getCoursesByTitle(searchQuery));
    } else {
      const categories = data.categories;
      const rightCategory = categories.findIndex(
        (category) => category.categorytext === searchQuery
      );
      console.log(categories[rightCategory].categoryid);
      dispatch(getCoursesByCategory(categories[rightCategory].categoryid));
    }
    console.log(courses);
  }, [searchQuery, type, dispatch, data.categories]);

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
        {courses.map((course, index) => (
          <li key={index} className="course-card">
            <img src={course.courseimage} />
            <div className="course-details">
              <div className="course-first-line">
                <h2 className="course-title">{course.title}</h2>
                <h2 className="course-price">E£{course.price}</h2>
              </div>
              <h3 className="course-description">{course.description}</h3>
              <h3 className="course-instructor">
                {course.instructor.instructorname}
              </h3>
              <h3 className="course-rating">⭐ {course.rating}</h3>
              <h3 className="course-duration">{course.duration} total hours</h3>
              <button className="purchase">Purchase Course</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
