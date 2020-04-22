import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MovieIcon from "@material-ui/icons/Movie";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { isYoutubeURl } from "../utils/Common";
import notify from "../utils/Notification";

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
  const [youtubeUrl, setYoutubeUrl] = useState();
  const [open, setOpen] = React.useState(false);

  const login = () => {
    history.push("/login");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const logout = async () => {
    if (token) {
      props.setUser(null);
      localStorage.removeItem("token");
      history.push("/");
    }
  };

  const shareMovie = () => {
    let temp = [];
    if (isYoutubeURl(youtubeUrl)) {
      let id = 1;
      if (localStorage.getItem("movieUrls")) {
        id = JSON.parse(localStorage.getItem("movieUrls")).length + 1;
        temp = JSON.parse(localStorage.getItem("movieUrls")).concat([
          {
            id: id,
            url: youtubeUrl,
            sharedBy: user.email,
          },
        ]);
      } else {
        temp = [{ id: 1, url: youtubeUrl, sharedBy: user.email }];
      }
      localStorage.setItem("movieUrls", JSON.stringify(temp));
      props.renderMovies([{ id: id, url: youtubeUrl, sharedBy: user.email }]);
      notify("Info", "Shared a movie successfully ", "success");
    } else {
      notify("Error", "Invalid youtube URL!", "danger");
    }
    setYoutubeUrl("");

    handleClose();
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
              <Button color="inherit" onClick={handleClickOpen}>
                Share a movie
              </Button>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </span>
          )}
        </Toolbar>
      </AppBar>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle id="form-dialog-title">Share a Movie</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="url"
            label="Youtube URL"
            fullWidth
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={shareMovie} color="primary">
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
