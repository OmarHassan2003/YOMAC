import { Link } from "react-router-dom";
import ronaldo from "../../assets/ronaldo.webp";
import "./Navbar.css";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  return (
    <nav
      style={{
        backgroundColor: isHomePage ? " rgb(73, 187, 189)" : "white",
      }}
      className="navbar"
    >
      <img src={ronaldo} />
      <div>
        <Link style={{ color: isHomePage ? "white" : "black" }} to="/">
          Home
        </Link>
        <Link style={{ color: isHomePage ? "white" : "black" }} to="/dashboard">
          Dashboard
        </Link>
        <Link
          style={{ color: isHomePage ? "white" : "black" }}
          to="/whiteboard"
        >
          Whiteboard
        </Link>
        <Link style={{ color: isHomePage ? "white" : "black" }} to="/course">
          Courses
        </Link>
        <Link style={{ color: isHomePage ? "white" : "black" }} to="/profile">
          Profile
        </Link>
        <Link style={{ color: isHomePage ? "white" : "black" }} to="/login">
          Login
        </Link>
        <Link style={{ color: isHomePage ? "white" : "black" }} to="/register">
          Register
        </Link>
      </div>
    </nav>
  );
}
