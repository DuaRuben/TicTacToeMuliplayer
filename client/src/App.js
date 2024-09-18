import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import Game from "./components/Game";
import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function App() {
  const api_key = "ysvphnrcgte8";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const navigate = useNavigate();
  const client = StreamChat.getInstance(api_key);

  const [isAuth, setAuth] =  useState(false);

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

  useEffect(()=>{
    if(token){
      client.connectUser(
        {
        id: cookies.get("userId"),
        name: cookies.get("username"),
        firstName: cookies.get("firstName"),
        lastName: cookies.get("lastName"),
        hashedPassword: cookies.get("hashedPassword"),
        },
        token
      ).then((user) =>{
        setAuth(true);
        navigate("/game");
      });
    }
  },[token,client, cookies,navigate]);
  
  return (
    <div className="App">
      <Router>
        < Header />
        {isAuth && <button onClick={LogOut}>Log Out</button>}
        <Routes>
          {isAuth ? (
            <>
             <Route path="/game" element={<Game />} />
             <Route path="*" element={<Game />} />
            </>
          ):(
            <>
            <Route path="/" element={<Login setAuth={setAuth}  />} />
            <Route path="/signup" element={<SignUp setAuth={setAuth} />} />
            <Route path="*" element={<Login setAuth={setAuth} />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
