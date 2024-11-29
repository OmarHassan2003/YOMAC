import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="usertype">
      <Link to="/studentLogin">
        <h2 className="login-type-label">For Students</h2>
        <button>Log in as a Student</button>
      </Link>
      <Link to="/instructorlogin">
        <h2 className="login-type-label">For Instructors</h2>
        <button>Log in as an Instructor</button>
      </Link>
    </div>
  );
}
