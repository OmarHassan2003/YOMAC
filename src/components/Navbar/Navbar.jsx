import { Link } from "react-router-dom";
import ronaldo from "../../assets/ronaldo.webp";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <img src={ronaldo} />
      <div>
        <Link to="/">Home</Link>
        <Link to="/course">Courses</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}
