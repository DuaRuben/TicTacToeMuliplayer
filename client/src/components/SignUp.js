import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import Axios from "axios";
import Cookies from "universal-cookie";
import "./Form.css"

function SignUp({setAuth}) {
    const [user,setUser] = useState(null);
    const cookies = new Cookies();
    const API_BASE_URL = "https://tic-tac-toe-muliplayer-backend.vercel.app";
    
    const signUp = (event) => {
      event.preventDefault();
      Axios.post(`${API_BASE_URL}/api/signup`,user).then(res => {
           const { token, userId, firstName, lastName, username, hashedPassword } = res.data;
           cookies.set("token",token); 
           cookies.set("userId",userId); 
           cookies.set("username",username); 
           cookies.set("firstName",firstName); 
           cookies.set("lastName",lastName); 
           cookies.set("hashedPassword",hashedPassword);
      });
    };
    return (
      <div className="background">
          <div className ="form-div">
              <form className = "form">

                <div className = "title">
                <label className = "label"> Sign Up </label>
                </div>

                <div className="input-container">
                <label className = "label"> First Name: </label>
                <input className = "input" placeholder = "First Name" onChange = {(event)=> setUser({...user,firstName: event.target.value})}/>
                </div>

                <div className="input-container">
                <label className = "label"> Last Name: </label>
                <input className = "input" placeholder = "Last Name" onChange = {(event)=> setUser({...user,lastName: event.target.value})}/>
                </div>
                
                <div className="input-container">
                <label className = "label"> Username: </label>
                <input className = "input" placeholder = "Username" onChange = {(event)=> setUser({...user,username: event.target.value})}/>
                </div>

                <div className="input-container">
                <label className = "label"> Password: </label>
                <input className = "input" type="password" placeholder = "Password" onChange = {(event)=> setUser({...user,password: event.target.value})}/>
                </div>
                
                <button className = "button" onClick ={signUp}> SignUp </button>
                <p><Link to="/">Back</Link></p>
            </form>
        </div>
    </div>    
  )
}

export default SignUp;