import { Link } from "react-router-dom";
import { useState } from "react";
import show from "../../assets/show.png";
import hide from "../../assets/hide.png";
import "./StudentLogin.css";
import { useDispatch } from "react-redux";
import { StudentLoginAPI } from "../../RTK/Slices/AuthorizationSlice";

export default function StudentLogin() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    const user = {
      username,
      password,
    };

    dispatch(StudentLoginAPI(user));

    console.log(user);

    dispatch(StudentLoginAPI(user));
  };
  return (
    <div className="login-container">
      <div className="login-register-description">
        <h1>Studying Online is now much easier</h1>
        <h2>
          YOMAC is an interesting platform that will teach you in a much more
          interactive way, choose between various courses in many different
          categories
        </h2>
      </div>
      <form style={{ paddingLeft: "100px" }} onSubmit={handleRegister}>
        <h3 style={{ marginBottom: "15px" }}>Username</h3>
        <input
          className="input-textbox"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your user name"
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
        <Link to="/studentregister">
          <button className="switch-login">Create an account</button>
        </Link>
      </form>
    </div>
  );
}
