import { Link } from "react-router-dom";
import ronaldo from "../../assets/ronaldo.webp";
import userProfileIcon from "../../assets/user.png";

import "./Navbar.css";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const data = useSelector((state) => state.Authorization);
  console.log(data);

  const isHomePage = location.pathname === "/";
  const isLoggedIn = data.token !== null;
  const isStudent = data.role === "student";

  const handleLogOut = () => {
    localStorage.clear();
    window.location.reload();
  };

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
            </>
          ) : (
            <>
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

      {isLoggedIn && (
        <div className="profile" style={{ position: "relative" }}>
          <Link style={{ color: isHomePage ? "white" : "black" }} to="/profile">
            <img src={userProfileIcon} />
          </Link>

          <div className="profile-menu">
            <Link to="/profile">Profile Details</Link>
            <button onClick={handleLogOut}>Log Out</button>
          </div>
        </div>
      )}
    </nav>
  );
}
