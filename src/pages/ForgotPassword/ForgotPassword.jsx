import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";
import desktopPicture from "../../assets/desktop-illustration-x1.webp";
import mobilePicture from "../../assets/mobile-illustration-x1.webp";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [imageSrc, setImageSrc] = useState(desktopPicture);

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
  };

  return (
    <div className="forgot-main-container">
      <img className="main-image" src={imageSrc} alt="Login Illustration" />
      <form onSubmit={handleRegister}>
        <h1 style={{ marginBottom: "30px" }}>Forgot Password</h1>
        <h2
          style={{ marginBottom: "24px", fontWeight: "400", fontSize: "16px" }}
        >
          We'll email you a link so you can reset your password
        </h2>
        <input
          className="input-textbox"
          type="text"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="switch-login">Reset Password</button>

        <div className="forgot-container">
          <h4>or</h4>
          <Link to="/login">Log in</Link>
        </div>
      </form>
    </div>
  );
}
