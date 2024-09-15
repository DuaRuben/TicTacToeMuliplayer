import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Axios from "axios";
import Cookies from "universal-cookie";
import "./Form.css";

function SignUp() {
    const [user,setUser] = useState(null);
    const cookies = new Cookies();
    const signUp = () => {
      Axios.post("http://localhost:3001/signup",user).then(res => {
           const { token,userId,firstName,lastName,username,hashedPassword } = res.data;
           
           cookies.set("token",token); 
           cookies.set("userId",userId); 
           cookies.set("firstName",firstName); 
           cookies.set("lastName",lastName); 
           cookies.set("username",username); 
           cookies.set("hashedPassword",hashedPassword); 
      })
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
                <input className = "input" placeholder = "Password" onChange = {(event)=> setUser({...user,password: event.target.value})}/>
                </div>
                
                <button className = "button" onClick ={signUp}> SignUp </button>
                <p><Link to="/">Back</Link></p>
            </form>
        </div>
    </div>    
  )
}

export default SignUp