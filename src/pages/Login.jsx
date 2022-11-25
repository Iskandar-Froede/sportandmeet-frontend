import { useState } from "react"
function Login ({onSubmit}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    
    const handleSubmit =async (event) =>{
      event.preventDefault()

      const response = await fetch("http://localhost:5005/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const parsed = await response.json();
    console.log(parsed);

    };
  return (
    <form onSubmit= {handleSubmit}>
         <label htmlFor="username">Username</label>
      <input id="username" value={username} onChange={e => setUsername(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">submit</button>
    </form>
  
    )}
    export default Login;