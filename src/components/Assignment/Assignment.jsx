import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAssign } from "../../RTK/Slices/CourseSlice";
import { useDispatch, useSelector } from "react-redux";
import "../Assignment/Assignment.css";

const Assignment = () => {
  const params = useParams();
  const navigate = useNavigate();
  const currAssignId = params.assignid;
  const courseId = params.courseid;
  const secId = params.secid;
  const { fetchedAssignments } = useSelector((state) => state.Course);
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    dispatch(getAssign(params.courseid));
  }, [params.assignid]);

  let sec;
  let assign;
  sec = fetchedAssignments.find(
    (section) => section.coursesectionid == params.secid
  );
  assign = sec?.assignment.find((ass) => ass.assignmentid == params.assignid);
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      // Logic to handle file submission goes here
      console.log("File submitted:", selectedFile);
      alert("File submitted successfully!");
    } else {
      alert("Please select a file to submit.");
    }
  };

  const handleBackToCourse = () => {
    navigate(`/course/${params.courseid}`);
  };
  return (
    <div className="assignment-page">
      <div className="assignment-header">
        <h1>Assignment Details</h1>
      </div>
      <div className="assignment-content">
        <div className="assignment-info">
          <h2>Title: {assign?.title}</h2>
          <p>
            <strong>Description:</strong> {assign?.description}
          </p>
          <p>
            <strong>Maximum Marks:</strong> {assign?.maxmarks}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(assign?.createdat).toLocaleString()}
          </p>
          <a
            href={assign?.fileattched}
            target="_blank"
            rel="noopener noreferrer"
            className="download-button"
          >
            Download Attached File
          </a>
        </div>
        <div className="assignment-submission">
          <h3>Submit Your Assignment</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input"
            />
            <button type="submit" className="submit-button">
              Submit Assignment
            </button>
          </form>
        </div>
      </div>
      <button className="back-btn" onClick={handleBackToCourse}>
        Back to Course
      </button>
    </div>
  );
};

export default Assignment;
