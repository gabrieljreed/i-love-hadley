import { useState } from "react";
import "./App.css";
import Note from "./components/Note.jsx";
import Authenticator from "./components/Authenticator.jsx";

const PASSWORD = "star"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password!");
    }
  };

  if (!isAuthenticated) {
    return (
      <Authenticator
        password={password}
        setPassword={setPassword}
        handlePasswordSubmit={handlePasswordSubmit}
      />
    );
  }

  return <Note />;
}

export default App;
