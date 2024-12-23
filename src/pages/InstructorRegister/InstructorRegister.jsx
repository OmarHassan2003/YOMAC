import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import show from "../../assets/show.png";
import hide from "../../assets/hide.png";
import desktopPicture from "../../assets/desktop-illustration-x1.webp";
import mobilePicture from "../../assets/mobile-illustration-x1.webp";
import "./InstructorRegister.css";
import { useDispatch } from "react-redux";
import { InstructorRegisterAPI } from "../../RTK/Slices/AuthorizationSlice";

export default function InstructorRegister() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Bio, setBio] = useState("");
  const [socialMedia, setSocialMedia] = useState([]);
  const [currSocial, setCurrSocial] = useState("");
  const [fileName, setFileName] = useState("No file chosen");
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(desktopPicture);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setImageSrc(window.innerWidth <= 750 ? mobilePicture : desktopPicture);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    formData.append("Bio", Bio);
    formData.append("SocialMedia", socialMedia);
    formData.append("image", file);
    console.log(formData);
    dispatch(InstructorRegisterAPI(formData))
    .then(response => {
      console.log(response);
      if(response.payload.message === "Instructor created successfully")
      {
        navigate(`/instructorlogin`);
      }
    });
  };

  // const handleRegister = (e) => {
  //   e.preventDefault();

  //   const user = {
  //     name: `${firstName} ${lastName}`,
  //     email,
  //     username,
  //     password,
  //     Bio,
  //     socialMedia,
  //   };

  //   console.log(user);

  //   fetch("http://localhost:3500/api/auth/instrutor_sign_up", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       body: JSON.stringify(user),
  //     },
  //   }).then(() => console.log("new instructor added"));
  // };

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
      <img className="main-image" src={imageSrc} alt="Register Illustration" />
      <form onSubmit={handleRegister}>
        <h3>First Name</h3>
        <input
          className="input-textbox"
          type="text"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter your first name"
        />
        <h3>Last Name</h3>
        <input
          className="input-textbox"
          type="text"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter your last name"
        />
        <h3>Email</h3>
        <input
          className="input-textbox"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email"
        />
        <h3>Username</h3>
        <input
          className="input-textbox"
          type="text"
          required
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your user name"
        />
        <h3>Password</h3>
        <div style={{ position: "relative" }}>
          <input
            className="input-textbox"
            type={showPassword ? "text" : "password"}
            required
            value={password}
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            className="toggle-password"
          >
            {showPassword ? <img src={hide} /> : <img src={show} />}
          </button>
        </div>
        <h3>Bio</h3>
        <input
          className="input-textbox"
          type="text"
          required
          value={Bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Enter your bio"
        />
        <h3>Social Media Accounts</h3>
        <input
          className="input-textbox"
          type="text"
          value={currSocial}
          onChange={(e) => setCurrSocial(e.target.value)}
          placeholder="Enter a social media account"
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
            <li key={index} className="ana-elmalek">
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

        <h3>Profile Picture</h3>
        <div className="parent-container">
          <label className="input-file-field">
            <input
              type="file"
              className="custom-file-input"
              accept="image/png"
              onChange={handleFileChange}
            />
            Choose File
          </label>
          <span className="file-name">{fileName}</span>
        </div>

        <button className="login-register-button" type="submit">
          Register
        </button>

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
