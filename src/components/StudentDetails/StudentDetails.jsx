import { useState, useEffect, useRef } from "react";
import "./StudentDetails.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudent,
  updateUser,
  updateUserThenGet,
} from "../../RTK/Slices/StudentSlice";
import { EnrollOnPrivateCourse } from "../../RTK/Slices/CourseSlice";

const StudentDetails = () => {
  const dispatch = useDispatch();
  const privateCourseInp = useRef(null);
  let data = useSelector((state) => state.student);
  useEffect(() => {
    dispatch(getStudent());
  }, []);
  data = data.object;
  const [firstName, setFirstName] = useState(data?.studentname?.split(" ")[0]);
  const [lastName, setLastName] = useState(
    data?.studentname?.split(" ").at(-1)
  );
  const [email, setEmail] = useState(data?.email);
  const [username, setUsername] = useState(data?.username);
  const [password, setPassword] = useState("");

  useEffect(() => {
    setUsername(data?.username);
    setFirstName(data?.studentname?.split(" ")[0]);
    setLastName(data?.studentname?.split(" ").at(-1));
    setEmail(data?.email);
    setPassword("");
  }, [data]);
  const handleSave = (e) => {
    e.preventDefault();
    const user = {
      name: data.studentname,
      email: email,
      username: username,
      password: password,
    };
    console.log(user);
    dispatch(updateUserThenGet(user));
  };
  const handleCancel = () => {
    setFirstName(data?.studentname?.split(" ")[0]);
    setLastName(data?.studentname?.split(" ").at(-1));
    setEmail(data?.email);
    setUsername(data?.username);
    setPassword("");
  };
  return (
    <>
      <form onSubmit={handleSave}>
        <div className="form-group" style={{ marginTop: "20px" }}>
          <input type="text" placeholder="First Name" value={firstName} />
          <input type="text" placeholder="last Name" value={lastName} />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" value={email} />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button className="save" type="submit">
            Update Profile
          </button>
          <button className="cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
      <form className="private-course-enroll" onSubmit={(e) => {
        e.preventDefault();
        dispatch(EnrollOnPrivateCourse(privateCourseInp.current.value))
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
        e.target.reset();
      }}>
        <label htmlFor="private-course-enrollment">Enroll on a private course</label>
        <input placeholder="Course ID" required id="private-course-enrollment" ref={privateCourseInp} type="number" min={0} />
        <button>Enroll</button>
      </form>
    </>
  );
};

export default StudentDetails;
