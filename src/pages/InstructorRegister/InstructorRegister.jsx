import { Link } from "react-router-dom";
import { useState } from "react";
import show from "../../assets/show.png";
import hide from "../../assets/hide.png";
import "./InstructorRegister.css";

export default function InstructorRegister() {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Bio, setBio] = useState("");
  const [socialMedia, setSocialMedia] = useState([]);
  const [currSocial, setCurrSocial] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const user = {
      name: `${firstName} ${lastName}`,
      email,
      username,
      password,
      Bio,
      socialMedia,
    };

    console.log(user);

    fetch("http://localhost:3500/api/auth/instrutor_sign_up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        body: JSON.stringify(user),
      },
    }).then(() => console.log("new instructor added"));
  };

  const addSocialMedia = () => {
    if (
      currSocial.trim !== "" &&
      currSocial.includes("@") &&
      currSocial.slice(currSocial.indexOf("@") + 1) !== ""
    ) {
      setSocialMedia([...socialMedia, currSocial]);
      setCurrSocial("");
    }
  };

  const removeSocialMedia = (index) => {
    setSocialMedia(socialMedia.filter((_, i) => i !== index));
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
        <h3 style={{ marginBottom: "15px" }}>Bio</h3>
        <input
          className="input-textbox"
          type="text"
          required
          value={Bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Enter your bio"
          style={{ marginBottom: "30px" }}
        />
        <h3 style={{ marginBottom: "15px" }}>Social Media Accounts</h3>
        <input
          className="input-textbox"
          type="text"
          value={currSocial}
          onChange={(e) => setCurrSocial(e.target.value)}
          placeholder="Enter a social media account"
          style={{ marginBottom: "10px" }}
        />
        <button
          className="add-socialmedia-button"
          type="button"
          onClick={addSocialMedia}
        >
          Add Account
        </button>
        <ul>
          {socialMedia.map((account, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              {account}{" "}
              <button
                className="remove-socialmedia"
                type="button"
                onClick={() => removeSocialMedia(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
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
        <Link to="/instructorlogin">
          <button className="switch-login">
            Log in to your existing account
          </button>
        </Link>
      </form>
    </div>
  );
}
