import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import { StreamChat } from "stream-chat";
import dotenv from "dotenv";
import Cookies from "universal-cookie";

dotenv.config();

function App() {
  const api_key = process.env.API_KEY;
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
        token,
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
  const navigate = useNavigate();
  const client = StreamChat.getInstance(api_key);

  const [isAuth, setAuth] =  useState(false);

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
      });
    }
  },[token,client, cookies]);

  return (
    <div className="App">
      <Router>
        <Header isAuth={isAuth} setAuth={setAuth} client={client} cookies ={cookies} navigate ={navigate}/>
        <AppRoutes isAuth={isAuth} setAuth={setAuth} client={client} cookies={cookies} />
      </Router>
    </div>
  );
}
function AppRoutes({ isAuth, setAuth, client, cookies }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/game");
    }
  }, [isAuth, navigate]);

  return (
    <>
      <Routes>
        {isAuth ? (
          <>
            <Route path="/game" element={<Game />} />
            <Route path="*" element={<Game/>} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login setAuth={setAuth} />} />
            <Route path="/signup" element={<SignUp setAuth={setAuth} />} />
            <Route path="*" element={<Login setAuth={setAuth} />} />
          </>
        )}
      </Routes>
    </>
  );
}

//   return (
//     <div className="App">
//       <Router>
//         < Header />
//         {isAuth && <button onClick={LogOut}>Log Out</button>}
//         <Routes>
//           {isAuth ? (
//             <>
//              <Route path="/game" element={<Game />} />
//              <Route path="*" element={<Game />} />
//             </>
//           ):(
//             <>
//             <Route path="/" element={<Login setAuth={setAuth}  />} />
//             <Route path="/signup" element={<SignUp setAuth={setAuth} />} />
//             <Route path="*" element={<Login setAuth={setAuth} />} />
//             </>
//           )}
//         </Routes>
//       </Router>
//     </div>
//   );
// }

export default App;
