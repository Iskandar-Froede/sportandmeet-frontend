import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/signup">SIGNUP</Link>
      </li>
      <li>
        <Link to="/login">LOGIN</Link>
      </li>
      <li>
        <Link to="/profile">Profile Page</Link>
      </li>
      <li>
        <Link to="/events">EVENTS</Link>
      </li>
    </div>
  );
}
export default Navbar;
