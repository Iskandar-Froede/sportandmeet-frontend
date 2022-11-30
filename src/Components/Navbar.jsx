import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";

function Navbar(props) {
  const { authContext } = props;

  return (
    <nav>
      <li>
        <Link to="/">Home</Link>
      </li>
      {(authContext && (
        <>
          <li>
            <Link to="/profile">Profile Page</Link>
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
    </nav>
  );
}
export default Navbar;
