import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import JoinGame from "./components/JoinGame";
import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Chat} from 'stream-chat-react'


function App() {
  const api_key = "9jw7tpknzwx7";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const navigate = useNavigate();
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setAuth] =  useState(false);

  const logOut = async () => {
    try {
      await client.disconnectUser(); // Wait for the client to disconnect
      cookies.remove("token");
      cookies.remove("userId");
      cookies.remove("firstName");
      cookies.remove("lastName");
      cookies.remove("hashedPassword");
      cookies.remove("channelName");
      cookies.remove("username");
      setAuth(false);
      navigate("/"); // Redirect user to the login page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  
  useEffect(() => {
    if (token) {
      client.connectUser(
          {
            id: cookies.get("userId"),
            name: cookies.get("username"),
            firstName: cookies.get("firstName"),
            lastName: cookies.get("lastName"),
            hashedPassword: cookies.get("hashedPassword"),
          },
          token
        )
        .then((user) => {
          setAuth(true);
        })
        .catch((error) => {
          console.error("Error connecting user:", error);
          setAuth(false);

        });
    }
  }, [setAuth,token]);
  
  return (
    <div className="App">
        < Header/>
        {isAuth && <button className = "logOutbutton" onClick={logOut}>Log Out</button>}
        <Routes>
          {isAuth ? (
            <>
             <Route 
                path="/joingame" 
                element={ 
                  <Chat client={client}>
                      <JoinGame />
                  </Chat>}
              />
              <Route
              path="*"
              element={
                <Chat client={client}>
                  <JoinGame />
                </Chat>
              }
            />
            </>
          ):(
            <>
            <Route path="/" element={<Login setAuth={setAuth}  />} />
            <Route path="/signup" element={<SignUp setAuth={setAuth} />} />
            <Route path="*" element={<Login setAuth={setAuth} />} />
            </>
          )}
        </Routes>
    </div>
  );
}

export default App;
