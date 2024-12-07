import { Link } from "react-router-dom";
import { useState } from "react";
import "./StudentRegister.css";
import show from "../../assets/show.png";
import hide from "../../assets/hide.png";

export default function StudentRegister() {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const handleRegister = (e) => {
    e.preventDefault();

    const user = {
      name: `${firstName} ${lastName}`,
      email,
      username,
      password,
    };

    console.log(user);

    fetch("http://localhost:3500/api/auth/student_sign_up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        body: JSON.stringify(user),
      },
    }).then(() => console.log("new student added"));
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
        <h3 style={{ marginBottom: "15px" }}>First Name</h3>
        <input
          className="input-textbox"
          type="text"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter your first name"
          style={{ marginBottom: "30px" }}
        />
        <h3 style={{ marginBottom: "15px" }}>Last Name</h3>
        <input
          className="input-textbox"
          type="text"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter your last name"
          style={{ marginBottom: "30px" }}
        />
        <h3 style={{ marginBottom: "15px" }}>Email</h3>
        <input
          className="input-textbox"
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email"
          style={{ marginBottom: "30px" }}
        />

        <h3 style={{ marginBottom: "15px" }}>Username</h3>
        <input
          className="input-textbox"
          type="text"
          required
          value={username}
          onChange={(e) => setUserName(e.target.value)}
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

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "30px",
          }}
        >
          <button className="login-register-button" type="submit">
            Register
          </button>
        </div>

        <h2>Already have an account?</h2>
        <Link to="/studentlogin">
          <button className="switch-login">
            Log in to your existing account
          </button>
        </Link>
      </form>
    </div>
  );
}
