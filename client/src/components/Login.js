import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import "./Form.css";

function Login() {
    const [username,setUsername] = useState(null);
    const[password,setPassword] = useState(null);
    const login = () => {};
  return (
    <div>
    <form className ="form">
        <label className = "label"> Login </label>

        <div className ="input-container">
        <label className = "label"> Username: </label>
        <input className = "input" placeholder = "Username" onChange = {(event)=> setUsername(event.target.value)}/>
        </div>
        <div className ="input-container">
        <label className = "label"> Password: </label>
        <input className = "input" placeholder = "Password" onChange = {(event)=> setPassword(event.target.value)}/>
        </div>
        <button onClick ={login} className = "button"> Login </button>
    </form>
    <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
    </div>
  )
}

export default Login