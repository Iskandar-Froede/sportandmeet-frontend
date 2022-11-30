import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";

function Navbar(props) {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const { authContext } = props;

  return (
    <header>
      <h3>LOGO</h3>
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

        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>

      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}
export default Navbar;
