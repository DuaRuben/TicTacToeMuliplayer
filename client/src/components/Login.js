import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import Axios from "axios";
import Cookies from "universal-cookie";
import "./Form.css";

function Login({setAuth}) {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const cookies = new Cookies();
    const API_BASE_URL = "https://tic-tac-toe-muliplayer-backend.vercel.app/";
    const login = (event) => {
      event.preventDefault();
      Axios.post(`${API_BASE_URL}/api/login`,{username,password}).then(res => {
        const { firstName, lastName, username,token, userId } = res.data;
        cookies.set("token",token); 
        cookies.set("userId",userId); 
        cookies.set("username",username); 
        cookies.set("firstName",firstName); 
        cookies.set("lastName",lastName); 
        setAuth(true);
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

export default Login;