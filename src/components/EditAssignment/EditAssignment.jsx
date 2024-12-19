import React, { useEffect, useRef, useState } from "react";
import "./EditAssignment.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addAssignment,
  getAssign,
  getSingleAssign,
  gradeAssign,
  updateAssignment,
} from "../../RTK/Slices/CourseSlice";
const EditAssignment = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fetchedSingleAssign } = useSelector((state) => state.Course);
  const assignment = fetchedSingleAssign?.assignment;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [maxMarks, setMaxMarks] = useState(0);
  const [passingMarks, setPassingMarks] = useState(0);
  const [assignment_file, setAssignment_file] = useState(null);
  const [activeTab, setActiveTab] = useState("edit");
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    dispatch(getSingleAssign(params.assignid));
  }, [dispatch, params.assignid]);

  useEffect(() => {
    if (fetchedSingleAssign) {
      setTitle(fetchedSingleAssign.assignment?.title || "");
      setDescription(fetchedSingleAssign.assignment?.description || "");
      setMaxMarks(fetchedSingleAssign.assignment.maxmarks || "");
      setPassingMarks(fetchedSingleAssign.assignment.passingmarks || "");
      setAssignment_file(fetchedSingleAssign.assignment?.fileattched || null);
    }
    if (fetchedSingleAssign?.students_data) {
      const initialGrades = fetchedSingleAssign.students_data.map(
        (submission) => ({
          studentassignmentid: submission.studentassignmentid,
          grade: submission.grade || "",
        })
      );
      setGrades(initialGrades);
    }
  }, [fetchedSingleAssign]);
  console.log(fetchedSingleAssign);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setAssignment_file(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!assignment_file) {
      alert("No file selected!");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("maxMarks", Number(maxMarks));
    formData.append("passingMarks", Number(passingMarks));
    formData.append("assignment_file", assignment_file);
    formData.append("assignmentID", params.assignid);
    dispatch(updateAssignment(formData));
    alert("Assignment Updated");
    navigate(`/course/${params.courseid}`);
  };

  const handleBackToCourse = () => {
    navigate(`/course/${params.courseid}`);
  };
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleGradeChange = (studentassignmentid, value) => {
    const updatedGrades = grades.map((gradeEntry) =>
      gradeEntry.studentassignmentid === studentassignmentid
        ? { ...gradeEntry, grade: value }
        : gradeEntry
    );
    setGrades(updatedGrades);
  };
  const handleSubmitGrade = (studentassignmentid) => {
    const studentGrade = grades.find(
      (grade) => grade.studentassignmentid === studentassignmentid
    )?.grade;

    if (studentGrade === "" || studentGrade === undefined) {
      alert("Please enter a grade before submitting.");
      return;
    }
    console.log(studentGrade);
    dispatch(
      gradeAssign({
        studentAssignmentID: studentassignmentid,
        grade: +studentGrade,
      })
    );
  };

  return (
    <div className="add-assignment-container">
      <div className="course-navbar">
        <div
          className={`tab ${activeTab === "edit" ? "active" : ""}`}
          onClick={() => handleTabClick("edit")}
        >
          Edit
        </div>
        <div
          className={`tab ${activeTab === "submissions" ? "active" : ""}`}
          onClick={() => handleTabClick("submissions")}
        >
          Submissions
        </div>
      </div>
      {activeTab === "edit" && (
        <>
          <div className="assignment-header">
            <h2>Edit Assignment</h2>
            <p>Edit an existing assignment in your course</p>
          </div>
          <form className="assignment-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter assignment title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Add a short description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                rows="4"
              />
            </div>

            <div className="form-group-inline">
              <div className="form-group">
                <label htmlFor="maxMarks">Max Marks</label>
                <input
                  type="number"
                  id="maxMarks"
                  name="maxMarks"
                  value={maxMarks}
                  onChange={(e) => {
                    setMaxMarks(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="passingMarks">Passing Marks</label>
                <input
                  type="number"
                  id="passingMarks"
                  name="passingMarks"
                  value={passingMarks}
                  onChange={(e) => {
                    setPassingMarks(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="assignment_file">Upload Assignment File</label>
              <input
                type="file"
                id="assignment_file"
                name="assignment_file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
            </div>

            <div className="form-submit">
              <button type="submit" className="submit-btn">
                Submit Changes
              </button>
            </div>
          </form>
        </>
      )}
      {activeTab === "submissions" && (
        <div className="student-submissions-container">
          {fetchedSingleAssign?.students_data.map((submission) => (
            <div className="submission-card" key={submission.student.studentid}>
              <img
                src={submission.student.profilepic}
                alt={`${submission.student.studentname}'s profile`}
                className="profile-pic"
              />
              <div className="submission-info">
                <h3>{submission.student.studentname}</h3>
                <p>Email:</p>
                <p>{submission.student.email}</p>
                <a
                  href={submission?.submissionlink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`submission-link ${
                    submission.submissionlink ? "" : "disabled-link"
                  }`}
                >
                  View Submission
                </a>
              </div>

              <div className="grade-section">
                <input
                  type="number"
                  placeholder="Enter Grade"
                  min="0"
                  max="100"
                  className="grade-input"
                  value={
                    grades.find(
                      (grade) =>
                        grade.studentassignmentid ===
                        submission.studentassignmentid
                    )?.grade || ""
                  }
                  onChange={(e) =>
                    handleGradeChange(
                      submission.studentassignmentid,
                      e.target.value
                    )
                  }
                />
                <button
                  className="submit-grade-btn"
                  onClick={() =>
                    handleSubmitGrade(submission.studentassignmentid)
                  }
                >
                  Submit Grade
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="back-btn" onClick={handleBackToCourse}>
        Back to Course
      </button>
    </div>
  );
};

export default EditAssignment;
