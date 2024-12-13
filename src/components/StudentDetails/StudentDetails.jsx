import { useState, useEffect } from "react";
import "./StudentDetails.css";

const StudentDetails = ({ data }) => {
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
  }, [data]);
  const handleSave = (e) => {
    e.preventDefault();
    const user = {
      name: `${firstName} ${lastName}`,
      email,
      username,
      password,
    };
    user.name = `${firstName} ${lastName}`;
    user.email = email;
    user.username = username;
    user.password = password;
    console.log(user);
  };
  const handleCancel = () => {
    setFirstName(data?.studentname?.split(" ")[0]);
    setLastName(data?.studentname?.split(" ").at(-1));
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
          Save profile
        </button>
        <button className="cancel" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default StudentDetails;
