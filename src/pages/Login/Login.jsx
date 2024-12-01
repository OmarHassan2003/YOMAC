import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  return (
    <div className="usertype">
      <Link className="login-register-link" to="/studentLogin">
        <h2 className="login-type-label">For Students</h2>
        <button>Log in as a Student</button>
      </Link>
      <Link className="login-register-link" to="/instructorlogin">
        <h2 className="login-type-label">For Instructors</h2>
        <button>Log in as an Instructor</button>
      </Link>
    </div>
  );
}
