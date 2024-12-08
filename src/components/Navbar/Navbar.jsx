import { Link } from "react-router-dom";
import ronaldo from "../../assets/ronaldo.webp";
import userProfileIcon from "../../assets/user.png";

import "./Navbar.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const data = useSelector((state) => state.Authorization);
  console.log(data);

  const isHomePage = location.pathname === "/";
  const isLoggedIn = data.token !== null;
  const isStudent = data.role === "student";

  return (
    <nav
      style={{
        backgroundColor: isHomePage ? "rgb(73, 187, 189)" : "white",
      }}
      className="navbar"
    >
      <img className="app-icon" src={ronaldo} />
      <div>
        <Link style={{ color: isHomePage ? "white" : "black" }} to="/">
          Home
        </Link>
        {isLoggedIn ? (
          isStudent ? (
            <>
              <Link
                style={{ color: isHomePage ? "white" : "black" }}
                to="/dashboard"
              >
                Dashboard
              </Link>
              <Link
                style={{ color: isHomePage ? "white" : "black" }}
                to="/course"
              >
                Courses
              </Link>
            </>
          ) : (
            <>
              <Link
                style={{ color: isHomePage ? "white" : "black" }}
                to="/whiteboard"
              >
                Whiteboard
              </Link>
              <Link
                style={{ color: isHomePage ? "white" : "black" }}
                to="/dashboard"
              >
                Dashboard
              </Link>
            </>
          )
        ) : null}
      </div>
      {!isLoggedIn && (
        <div>
          <Link style={{ color: isHomePage ? "white" : "black" }} to="/login">
            Login
          </Link>
          <Link
            style={{ color: isHomePage ? "white" : "black" }}
            to="/register"
          >
            Register
          </Link>
        </div>
      )}

      {isLoggedIn ? (
        <div>
          <Link style={{ color: isHomePage ? "white" : "black" }} to="/profile">
            <img src={userProfileIcon} />
          </Link>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
}
