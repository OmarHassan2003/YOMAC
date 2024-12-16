import { useState, useEffect } from "react";
import "./InstructorDetails.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudent,
  updateUser,
  updateUserThenGet,
} from "../../RTK/Slices/StudentSlice";

const InstructorDetails = () => {
  const dispatch = useDispatch();
  let data = useSelector((state) => state.student);
  useEffect(() => {
    dispatch(getStudent());
  }, []);
  data = data.object;
  const [firstName, setFirstName] = useState(
    data?.instructorname?.split(" ")[0]
  );
  const [lastName, setLastName] = useState(
    data?.instructorname?.split(" ").at(-1)
  );
  const [email, setEmail] = useState(data?.email);
  const [username, setUsername] = useState(data?.username);
  const [password, setPassword] = useState("");

  useEffect(() => {
    setUsername(data?.username);
    setFirstName(data?.instructorname?.split(" ")[0]);
    setLastName(data?.instructorname?.split(" ").at(-1));
    setEmail(data?.email);
    setPassword("");
  }, [data]);
  const handleSave = (e) => {
    e.preventDefault();
    const user = {
      name: data.instructorname,
      email: email,
      username: username,
      password: password,
    };
    console.log(user);
    dispatch(updateUserThenGet(user));
  };
  const handleCancel = () => {
    setFirstName(data?.instructorname?.split(" ")[0]);
    setLastName(data?.instructorname?.split(" ").at(-1));
    setEmail(data?.email);
    setUsername(data?.username);
    setPassword("");
  };
  return (
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
  );
};

export default InstructorDetails;
