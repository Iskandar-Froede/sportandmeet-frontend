import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";

function Navbar(props) {
  const { authContext } = props;

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <nav>
      <li>
        <Link to="/">HOME</Link>
      </li>
      {(authContext && (
        <>
          <li>
            <Link to="/profile">PROFILE</Link>
          </li>
          <li>
            <Link to="/events">EVENTS</Link>
          </li>
        </>
      )) || (
        <>
          <li>
            <Link to="/signup">SIGNUP</Link>
          </li>
          <li>
            <Link to="/login">LOGIN</Link>
          </li>
        </>
      )}
      <button className="logout-btn" onClick={handleLogout}>
        LOGOUT
      </button>
    </nav>
  );
}
export default Navbar;
