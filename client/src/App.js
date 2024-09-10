import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Header from "./components/Header"

function App() {
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
