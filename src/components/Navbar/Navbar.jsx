import { Link } from "react-router-dom";
import ronaldo from "../../assets/Logo-Photoroom.png";
import userProfileIcon from "../../assets/user.png";
import searchIcon from "../../assets/search.png";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Navbar({ categories }) {
  const location = useLocation();
  const data = useSelector((state) => state.Authorization);

  const [searchQuery, setSearchQuery] = useState("");
  const [renderSearch, setRenderSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const isHomePage = location.pathname === "/";
  const isLoggedIn = data.token !== null;
  const isStudent = data.role === "student";

  const navigate = useNavigate();

  const handleLogoCLick = () => {
    navigate("/");
  };

  const handleSearch = (e, s) => {
    e.preventDefault();
    setRenderSearch(true);
    console.log(s, searchQuery);
    s === "title"
      ? navigate(`/search/title/${searchQuery}`)
      : navigate(`/search/category/${e.target.textContent}`);
  };

  const handleCategoriesClick = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      {isLoggedIn && (
        <div className="categories-container" ref={dropdownRef}>
          <button
            style={{ color: isHomePage ? "white" : "black" }}
            className="browse-categories"
            onClick={handleCategoriesClick}
          >
            Browse Categories
          </button>
          {showDropdown && categories.length > 0 && (
            <ul className="categories-dropdown">
              {categories.map((category, index) => (
                <li
                  onClick={(e) => handleSearch(e, "category")}
                  key={index}
                  className="category-item"
                >
                  {category.categorytext}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {isLoggedIn && (
        <form
          onSubmit={(e) => handleSearch(e, "title")}
          className="middle-section"
        >
          <input
            style={{
              border: isHomePage
                ? "1px solid rgb(73, 187, 189)"
                : "1px solid #28a745",
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
                : "1px solid #28a745",
            }}
            onClick={(e) => handleSearch(e, "title")}
            className="search-button"
          >
            <img className="search-icon" src={searchIcon} />
          </button>
        </form>
      )}
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
              <Link
                style={{ color: isHomePage ? "white" : "black" }}
                to="/stats"
              >
                Stats
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
              <Link
                style={{ color: isHomePage ? "white" : "black" }}
                to="/stats"
              >
                Stats
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
