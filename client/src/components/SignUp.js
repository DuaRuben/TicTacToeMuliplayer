import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./Form.css"

function SignUp() {
    const [user,setUser] = useState(null);
    const signUp = () => {};
  return (
    <div>
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
        </form>
        <p><Link to="/">Back</Link></p>
    </div>
  )
}

export default SignUp