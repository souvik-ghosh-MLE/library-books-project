import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./assets/Pages/Login";
import Books from "./assets/Pages/Books";
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </Router>
  );
}

export default App;
