import { Link } from "react-router-dom";
import { useState } from "react";

export default function StudentRegister() {
  const [email, setEmail] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const handleRegister = (e) => {
    e.preventDefault();

    const user = {
      name: `${firstName} ${lastName}`,
      email,
      userName,
      password,
    };

    fetch("http://localhost:3500/api/auth/student_sign_up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        body: JSON.stringify(user),
      },
    }).then(() => console.log("new blog added"));
  };

  return (
    <div className="login-container">
      <div
        style={{
          flex: 1,
          backgroundColor: "rgb(73, 187, 189)",
          borderRadius: "40px",
          padding: "20px 40px 20px 40px",
        }}
      >
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
          onChange={(e) => setfirstName(e.target.value)}
          placeholder="Enter your first name"
          style={{ marginBottom: "30px" }}
        />
        <h3 style={{ marginBottom: "15px" }}>Last Name</h3>
        <input
          className="input-textbox"
          type="text"
          required
          value={lastName}
          onChange={(e) => setlastName(e.target.value)}
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
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
          placeholder="Enter your user name"
          style={{ marginBottom: "30px" }}
        />
        <h3 style={{ marginBottom: "15px" }}>Password</h3>
        <input
          className="input-textbox"
          type="text"
          required
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Enter your password"
          style={{ marginBottom: "10px" }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "30px",
          }}
        >
          <button
            className="login-register-button"
            style={{
              display: "inline-block",
              marginTop: "20px",
            }}
            type="sumbit"
          >
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
