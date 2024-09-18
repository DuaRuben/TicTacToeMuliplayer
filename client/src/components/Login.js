import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import Axios from "axios";
import Cookies from "universal-cookie";
import "./Form.css";

function Login() {
    const [username,setUsername] = useState(null);
    const [password,setPassword] = useState(null);
    const cookies = new Cookies();
    const login = () => {
      Axios.post("http://localhost:3001/login",{username,password}).then(res => {
        const { firstName, lastName, username,token, userId } = res.data;
        cookies.set("token",token); 
        cookies.set("userId",userId); 
        cookies.set("username",username); 
        cookies.set("firstName",firstName); 
        cookies.set("lastName",lastName); 
      });
    };
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
            <input className = "input" type="password" placeholder = "Password" onChange = {(event)=> setPassword(event.target.value)}/>
            </div>

            <button className = "button" onClick ={login}> Login </button>
            <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
        </form>
        </div>
    </div>
    
  )
}

export default Login