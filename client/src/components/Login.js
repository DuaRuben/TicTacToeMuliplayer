import React, {useState} from 'react'
import { Link } from 'react-router-dom';


function Login() {
    const [username,setUsername] = useState(null);
    const[password,setPassword] = useState(null);
    const login = () => {};
  return (
    <div>
    <form>
        <label> label </label>
        <input placeholder = "Username" onChange = {(event)=> setUsername(event.target.value)}/>
        <input placeholder = "Password" onChange = {(event)=> setPassword(event.target.value)}/>
        <button onClick ={login}> Login </button>
    </form>
    <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
    </div>
    
  )
}

export default Login