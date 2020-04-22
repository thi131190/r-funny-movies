import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ReactNotifications from "react-notifications-component";
import { Switch, Route } from "react-router-dom";
import notify from "./utils/Notification";
import { getIdFromUrl } from "./utils/Common";
import CircularProgress from "@material-ui/core/CircularProgress";

function App() {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  let urls = [];

  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const url = `${process.env.REACT_APP_API_URL}/user/get_user`;
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

  const getMoviesInfo = async (id, youtubeId, sharedBy) => {
    const apiKey = "AIzaSyDK3ubxk_5hg-2iiCws88BAYt1V-tM9xfg";
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${youtubeId}&key=${apiKey}&part=snippet,statistics&fields=items(id,snippet,statistics)`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setMovies((movies) => [
      { id: id, sharedBy: sharedBy, info: data.items[0] },
      ...movies,
    ]);
  };

  const renderMovies = (urls) => {
    urls.map((e) => {
      getMoviesInfo(e.id, getIdFromUrl(e.url), e.sharedBy);
    });
  };

  useEffect(() => {
    getUser();
    if (localStorage.getItem("movieUrls")) {
      urls = JSON.parse(localStorage.getItem("movieUrls"));
    }
    renderMovies(urls);
  }, []);

  return (
    <div className="App">
      <ReactNotifications />
      <Navbar
        user={user}
        setUser={setUser}
        urls={urls}
        renderMovies={renderMovies}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <Switch>
            <Route path="/login">
              <Login setUser={setUser} />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Home movies={movies} user={user} />
            </Route>
          </Switch>
        </div>
      )}
    </div>
  );
}

export default App;
