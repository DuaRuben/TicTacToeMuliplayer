import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./Form.css"

function SignUp() {
    const [user,setUser] = useState(null);
    const signUp = () => {};
  return (
    <div>
        <form className = "form">
            <label className = "label"> Sign Up </label>
            <input className = "input" placeholder = "First Name" onChange = {(event)=> setUser({...user,firstName: event.target.value})}/>
            <input className = "input" placeholder = "Last Name" onChange = {(event)=> setUser({...user,lastName: event.target.value})}/>
            <input className = "input" placeholder = "Username" onChange = {(event)=> setUser({...user,username: event.target.value})}/>
            <input className = "input" placeholder = "Password" onChange = {(event)=> setUser({...user,password: event.target.value})}/>
            <button className = "button" onClick ={signUp}> SignUp </button>
        </form>
        <p><Link to="/">Back</Link></p>
    </div>
  )
}

export default SignUp