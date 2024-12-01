import { Link } from "react-router-dom";
import "./Register.css";

export default function Register() {
  return (
    <div className="usertype">
      <Link className="login-register-link" to="/studentregister">
        <h2 className="login-type-label">For Students</h2>
        <button>Register as a Student</button>
      </Link>
      <Link className="login-register-link" to="/instructorregister">
        <h2 className="login-type-label">For Instructors</h2>
        <button>Register as an Instructor</button>
      </Link>
    </div>
  );
}
