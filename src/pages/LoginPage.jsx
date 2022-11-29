import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/Session.Context";
 import "../App.css";

 const LoginPage = () => {
   const { setToken, setUser, verifyToken } = useContext(SessionContext);

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();
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
    if (parsed.status === 200) {
       setToken(parsed.token);

       localStorage.setItem("authToken", parsed.token);
       verifyToken();
       setUser(parsed.user);

       navigate("/profile");
    } else {
      setError(parsed);
    }
  };
  return (
    <div className="auth-form-container">
      <h2>LOGIN</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        {error?.message && <p>{error.message}</p>}
        <label htmlFor="email">email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
};
export default LoginPage;