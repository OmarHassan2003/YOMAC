import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCoursesByTitle } from "../../RTK/Slices/SearchSlice";
import { useEffect } from "react";
import "./Search.css";

export default function Search() {
  const { searchQuery } = useParams();
  const dispatch = useDispatch();
  console.log(searchQuery);
  const { courses } = useSelector((state) => state.Search);
  useEffect(() => {
    dispatch(getCoursesByTitle(searchQuery));
  }, []);
  console.log(courses);

  return (
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
              <h3 className="course-duration">{course.duration} total hours</h3>
              <button className="purchase">Purchase Course</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
