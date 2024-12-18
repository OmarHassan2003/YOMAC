import { Link } from "react-router-dom";
import ronaldo from "../../assets/ronaldo.webp";
import userProfileIcon from "../../assets/user.png";
import searchIcon from "../../assets/search.png";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();

  const data = useSelector((state) => state.Authorization);

  const [searchQuery, setSearchQuery] = useState("");
  const [renderSearch, setRenderSearch] = useState(false);

  const isHomePage = location.pathname === "/";
  const isLoggedIn = data.token !== null;
  const isStudent = data.role === "student";

  const navigate = useNavigate();

  const handleLogoCLick = () => {
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setRenderSearch(true);
    console.log(searchQuery);
    navigate(`/search/${searchQuery}`);
  };

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
      <img
        style={{ cursor: "pointer" }}
        onClick={handleLogoCLick}
        className="app-icon"
        src={ronaldo}
      />
      <form onSubmit={(e) => handleSearch(e)} className="middle-section">
        <input
          style={{
            border: isHomePage
              ? "1px solid rgb(73, 187, 189)"
              : "1px solid black",
          }}
          className="Search-bar"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          style={{
            border: isHomePage
              ? "1px solid rgb(73, 187, 189)"
              : "1px solid black",
          }}
          onClick={handleSearch}
          className="search-button"
        >
          <img className="search-icon" src={searchIcon} />
        </button>
      </form>
      <div>
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
            Log in
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
