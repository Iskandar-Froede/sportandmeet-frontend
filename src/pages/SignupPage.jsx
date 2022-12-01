import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${process.env.REACT_APP_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    const parsed = await response.json();
    console.log(parsed);
    navigate("/login");
  };

  function handleChange(event) {
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else if (event.target.name === "email") {
      setEmail(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  }

  return (
    <div className="auth-form-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>SIGN UP</h2>
        <label htmlFor="username">username </label>
        <input
          type="text"
          name="username"
          placeholder="create a username"
          value={username}
          onChange={handleChange}
        />

        <label htmlFor="email">email</label>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={handleChange}
        />

        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={handleChange}
        />

        <button>REGISTER</button>
      </form>
    </div>
  );
};

export default SignupPage;
