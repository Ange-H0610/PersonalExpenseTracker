import { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import LoginForm from "./login";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <LoginForm />
  );
}

export default App;
