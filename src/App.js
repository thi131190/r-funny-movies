import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ReactNotifications from "react-notifications-component";
import { Switch, Route } from "react-router-dom";
import notify from "./utils/Notification";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function getParam(name) {
    const url = window.location.href;
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
  }

  const getUser = async () => {
    const token = localStorage.getItem("token") || getParam("api_key");
    if (token) {
      const url = `https://fakebook-fs.herokuapp.com/user/get_user`;
      // const url = `${process.env.REACT_APP_API_URL}/user/get_user`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", token);
        setUser(data.user);
      } else {
        setUser(null);
        localStorage.removeItem("token");
        notify("Error", `Fail to login!`, "error");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="App">
      <ReactNotifications />
      <Navbar user={user} setUser={setUser} />
      <Switch>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
