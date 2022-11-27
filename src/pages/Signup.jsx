import { useState } from "react";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:5005/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    const parsed = await response.json();
    console.log(parsed);
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
      <h2>SIGNUP</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label for="username">username </label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
        />

        <label>email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />

        <label for="password">password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />

        <button>REGISTER</button>
      </form>
    </div>
  );
};

export default SignupPage;
