import { Link } from "react-router-dom";

export default function InstructorLogin() {
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
      <form style={{ paddingLeft: "100px" }}>
        <h3 style={{ marginBottom: "15px" }}>Username</h3>
        <input
          className="input-textbox"
          type="text"
          placeholder="Enter your user name"
          style={{ marginBottom: "30px" }}
        />
        <h3 style={{ marginBottom: "15px" }}>Password</h3>
        <input
          className="input-textbox"
          type="text"
          placeholder="Enter your password"
          style={{ marginBottom: "10px" }}
        />

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
          <button
            className="login-register-button"
            style={{
              display: "inline-block",
              marginTop: "20px",
            }}
          >
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
