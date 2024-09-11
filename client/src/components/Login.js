import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import "./Form.css";

function Login() {
    const [username,setUsername] = useState(null);
    const[password,setPassword] = useState(null);
    const login = () => {};
  return (
    <div className = "background">
        <div className="form-div">
        <form className ="form">
            
            <div className = "title">
                <label className = "label"> Login </label>
            </div>

            <div className ="input-container">
            <label className = "label"> Username: </label>
            <input className = "input" placeholder = "Username" onChange = {(event)=> setUsername(event.target.value)}/>
            </div>

            <div className ="input-container">
            <label className = "label"> Password: </label>
            <input className = "input" placeholder = "Password" onChange = {(event)=> setPassword(event.target.value)}/>
            </div>

            <button className = "button" onClick ={login}> Login </button>
            <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
        </form>
        </div>
    </div>
    
  )
}

export default Login