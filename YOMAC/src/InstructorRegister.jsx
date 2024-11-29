import { Link } from "react-router-dom";
import { useState } from "react";

export default function InstructorRegister() {
  const [email, setEmail] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [bio, setbio] = useState("");
  const [socialMedia, setSocialMedia] = useState([]);
  const handleRegister = (e) => {
    e.preventDefault();
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
        <h1>Teach Online with ease</h1>
        <h2>
          Teach with ease on YOMAC! Our platform empowers instructors to create
          interactive courses, engage with students, and share knowledge across
          a wide range of categories. Reach learners worldwide and make a
          lasting impact.
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
        <h3 style={{ marginBottom: "15px" }}>Bio</h3>
        <input
          className="input-textbox"
          type="text"
          required
          value={bio}
          onChange={(e) => setbio(e.target.value)}
          placeholder="Enter your bio"
          style={{ marginBottom: "30px" }}
        />
        <h3 style={{ marginBottom: "15px" }}>Social Media Accounts</h3>
        <input
          className="input-textbox"
          type="text"
          required
          value={Soc}
          onChange={(e) => setbio(e.target.value)}
          placeholder="Enter your bio"
          style={{ marginBottom: "30px" }}
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
          >
            Register
          </button>
        </div>
        <h2>Already have an account?</h2>
        <Link to="/instructorlogin">
          <button className="switch-login">
            Log in to your existing account
          </button>
        </Link>
      </form>
    </div>
  );
}
