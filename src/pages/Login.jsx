import { useState } from "react"
import { defaultMethod } from "react-router-dom/dist/dom"
function Login ({onSubmit}) {
  const [username, setUsername] = useState ("")
  const  [password, setPassword] = useState("")

  return (
    <form onSubmit={event => { 
      event.preventDefault()
      onSubmit({username, password})
    }}>
         <label htmlFor="username">Username</label>
      <input id="username" value={username} onChange={e => setUsername(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">submit</button>
    </form>
  
    )}
    export default Login;