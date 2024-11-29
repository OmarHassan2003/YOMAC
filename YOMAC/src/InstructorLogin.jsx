import { Link } from "react-router-dom";
import { useState } from "react";

export default function InstructorLogin() {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const user = {
      username,
      password,
    };
    console.log(user);
  };

  return (
    <div className="login-container">
      <div className="login-register-description">
        <h1>Teach Online with ease</h1>
        <h2>
          Teach with ease on YOMAC! Our platform empowers instructors to create
          interactive courses, engage with students, and share knowledge across
          a wide range of categories. Reach learners worldwide and make a
          lasting impact.
        </h2>
      </div>
      <form style={{ paddingLeft: "100px" }} onSubmit={handleRegister}>
        <h3 style={{ marginBottom: "15px" }}>Username</h3>
        <input
          className="input-textbox"
          type="text"
          placeholder="Enter your user name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: "30px" }}
        />
        <h3 style={{ marginBottom: "15px" }}>Password</h3>
        <input
          className="input-textbox"
          type="text"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          style={{ marginBottom: "10px" }}
        />

        <div className="remember-input" style={{ marginBottom: "20px" }}>
          <input type="checkbox" id="remember-label" />
          <label htmlFor="remember-label" style={{ marginLeft: "10px" }}>
            Remember me
          </label>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "30px",
          }}
        >
          <button className="login-register-button" type="submit">
            Login
          </button>
        </div>
        <h2>Don't have an account?</h2>
        <Link to="/instructorregister">
          <button className="switch-login">Create an account</button>
        </Link>
      </form>
    </div>
  );
}
