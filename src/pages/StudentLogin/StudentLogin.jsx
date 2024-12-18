import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import show from "../../assets/show.png";
import hide from "../../assets/hide.png";
import "./StudentLogin.css";
import { useDispatch } from "react-redux";
import {
  setForgotPasswordRole,
  StudentLoginAPI,
} from "../../RTK/Slices/AuthorizationSlice";
import desktopPicture from "../../assets/desktop-illustration-x1.webp";
import mobilePicture from "../../assets/mobile-illustration-x1.webp";

export default function StudentLogin() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [imageSrc, setImageSrc] = useState(desktopPicture);

  const handleForgotPassword = () => {
    dispatch(setForgotPasswordRole("student"));
  };

  useEffect(() => {
    const handleResize = () => {
      setImageSrc(window.innerWidth <= 700 ? mobilePicture : desktopPicture);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();

    const user = {
      username,
      password,
    };

    console.log(user);

    dispatch(StudentLoginAPI(user));
  };

  return (
    <div className="login-container">
      <img className="main-image" src={imageSrc} alt="Login Illustration" />
      <form onSubmit={handleRegister}>
        <h3 style={{ marginBottom: "15px" }}>Username</h3>
        <input
          className="input-textbox"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your user name"
        />
        <h3 style={{ marginBottom: "15px" }}>Password</h3>
        <div className="password-container">
          <input
            className="input-textbox"
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            className="toggle-password"
          >
            {showPassword ? (
              <img src={hide} alt="Hide" />
            ) : (
              <img src={show} alt="Show" />
            )}
          </button>
        </div>

        <div className="remember-input">
          <input type="checkbox" id="remember-label" />
          <label style={{ marginLeft: "4px" }} htmlFor="remember-label">
            Remember me
          </label>
        </div>

        <button className="login-register-button" type="submit">
          Login
        </button>

        <div className="forgot-container">
          <h4>or</h4>
          <Link onClick={handleForgotPassword} to="/resetpassword">
            Forgot Password
          </Link>
        </div>

        <h2>Don't have an account?</h2>
        <Link to="/studentregister">
          <button className="switch-login">Create an account</button>
        </Link>
      </form>
    </div>
  );
}
