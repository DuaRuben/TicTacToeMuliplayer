import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Header from "./components/Header"
import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";

function App() {
  const api_key = "ysvphnrcgte8";
  const cookies = new Cookies();
  const token = cookies.get("token");
  
  const client = StreamChat.getInstance(api_key);
  
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
      console.log(user);
    });
  }
  return (
    <div className="App">
      <Router>
        < Header />
        <Routes>
          <Route path="/" element={<Login />} />
       
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
