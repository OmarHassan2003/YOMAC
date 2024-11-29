import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <img src="images/8198-1694609670.webp" />
      <div>
        <Link to="/">Home</Link>
        <Link to="/course">Courses</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}
