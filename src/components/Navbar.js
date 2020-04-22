import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MovieIcon from "@material-ui/icons/Movie";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 100,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const { user } = props;
  const token = localStorage.getItem("token");

  const login = () => {
    history.push("/login");
  };

  const logout = async () => {
    if (token) {
      props.setUser(null);
      localStorage.removeItem("token");
      history.push("/");
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MovieIcon className={classes.icon} />
            Funny Movies
          </IconButton>
          <Typography variant="h6" className={classes.title}></Typography>
          {!user && (
            <Button color="inherit" onClick={login}>
              Login
            </Button>
          )}
          {user && (
            <span>
              <Button color="inherit">Share a movie</Button>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </span>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
