import { useState } from "react";
import 




function Login({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:5005/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const parsed = await response.json();
    console.log(parsed);
  };


  return (
    <div className="auth-form-container">
      <h2>LOGIN</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label for="email">email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleSubmit}
          />
        
        <label for="password">password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleSubmit}
          />
        
        <button>LOGIN</button>
      </form>
    </div>
  );
}
export default Login;
