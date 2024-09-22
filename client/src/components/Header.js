import React from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
import { StreamChat } from "stream-chat";
import "./Header.css"

function Header({isAuth, setAuth, client, cookies, navigate}) {

  const api_key = "ysvphnrcgte8";

  const LogOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    client.disconnectUser();
    setAuth(false);
    navigate("/");
  };

  return (
    <div className = "header">
        <h1 className = "heading"> Tic Tac Toe </h1>
        {isAuth && <button onClick={LogOut}>Log Out</button>}
    </div>
  )
}

export default Header