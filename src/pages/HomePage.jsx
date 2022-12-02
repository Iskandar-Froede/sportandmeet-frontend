import React from "react";
import { Link } from "react-router-dom";
import "../Styles/home.css";

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Sport and Meet</h1>
      <h2>
        {" "}
        Have you ever want to play any sport but you are new in town<br></br>{" "}
        and you don’t have anyone to play with?
      </h2>
      <h3>Do you want to join Sport and Meet? </h3>
      <Link to="/signup">
        <button className="btn-home">REGISTER</button>
      </Link>
      <h3>Already have an account?</h3>
      <Link to="/login">
        <button className="btn-home">LOGIN</button>
      </Link>
    </div>
  );
}

export default Home;
