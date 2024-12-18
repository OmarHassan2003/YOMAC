import React, { useEffect, useRef, useState } from "react";
import "./EditAssignment.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addAssignment,
  getAssign,
  getSingleAssign,
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

  //   console.log(fetchedSingleAssign);
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
  }, [fetchedSingleAssign]);

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

  return (
    <div className="add-assignment-container">
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
      <button className="back-btn" onClick={handleBackToCourse}>
        Back to Course
      </button>
    </div>
  );
};

export default EditAssignment;
