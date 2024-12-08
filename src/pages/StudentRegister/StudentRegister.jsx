import { Link } from "react-router-dom";
import { useState } from "react";
import "./StudentRegister.css";
import show from "../../assets/show.png";
import hide from "../../assets/hide.png";
import { useDispatch } from "react-redux";
import { StudentRegisterAPI } from "../../RTK/Slices/AuthorizationSlice";

export default function StudentRegister() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fileName, setFileName] = useState("No file chosen");
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "image/png") {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    } else {
      setFile(null);
      setFileName("Invalid file type. Please choose a PNG.");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!file) {
      alert("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("name", `${firstName} ${lastName}`);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("image", file);
    console.log(formData);
    dispatch(StudentRegisterAPI(formData));
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

        <h3 style={{ marginBottom: "15px", marginTop: "20px" }}>
          Profile Picture
        </h3>
        <label className="input-file-field">
          <input type="file" accept="image/png" onChange={handleFileChange} />
          Choose File
        </label>
        <span className="file-name">{fileName}</span>

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
