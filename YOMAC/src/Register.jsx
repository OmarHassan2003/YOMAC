import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="usertype">
      <Link to="/studentregister">
        <h2 className="login-type-label">For Students</h2>
        <button>Register as a Student</button>
      </Link>
      <Link to="/instructorregister">
        <h2 className="login-type-label">For Instructors</h2>
        <button>Register as an Instructor</button>
      </Link>
    </div>
  );
}
