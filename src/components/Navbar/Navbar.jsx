import { Link } from "react-router-dom";
import ronaldo from "../../assets/ronaldo.webp";
import "./Navbar.css";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  return (
    <nav
      style={{ backgroundColor: isHomePage ? " rgb(73, 187, 189)" : "white" }}
      className="navbar"
    >
      <img src={ronaldo} />
      <div>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/whiteboard">Whiteboard</Link>
        <Link to="/course">Courses</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}
