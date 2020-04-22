import React from "react";
import "./App.css";
import NavBar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Register />
    </div>
  );
}

export default App;
