import { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import LoginForm from "./login";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import Homepage from "./Homepage";
function App() {
  const [count, setCount] = useState(0);

  return (
    <LoginForm />

        <Router>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/homepage" element={<Homepage />} />
          </Routes>
        </Router>
  );
}

export default App;
