import { Link } from "react-router-dom";
import { useState } from "react";
import show from "../../assets/show.png";
import hide from "../../assets/hide.png";
import "./InstructorLogin.css";
import { useDispatch } from "react-redux";
import { InstructorLoginAPI } from "../../RTK/Slices/AuthorizationSlice";

export default function InstructorLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();

    const user = {
      username,
      password,
    };

    console.log(user);

    dispatch(InstructorLoginAPI(user));
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
        <div style={{ position: "relative" }}>
          <input
            className="input-textbox"
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={{ marginBottom: "10px" }}
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            style={{
              position: "absolute",
              right: "10px",
              top: "46%",
              transform: "translateY(-50%)",
              border: "none",
              background: "none",
            }}
          >
            {showPassword ? <img src={hide} /> : <img src={show} />}
          </button>
        </div>

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
