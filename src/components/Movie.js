import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import YouTube from "react-youtube";
import Grid from "@material-ui/core/Grid";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ExpandCollapse from "react-expand-collapse";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 360,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  button: {
    border: "none",
  },
}));

export default function Movie(props) {
  const { movie, sharedBy } = props;
  const classes = useStyles();

  return (
    <Grid container direction="row" spacing={10}>
      <Grid item xs={6}>
        <YouTube videoId={props.movie.id} />
      </Grid>
      <Grid item xs={6}>
        <Card className={classes.root}>
          <CardContent>
            <Typography
              variant="h6"
              color="secondary"
              align="left"
              component="p"
            >
              {movie.snippet.title}
            </Typography>
            <Typography variant="body1" align="left" component="p">
              <b>
                <i>Shared by: {sharedBy}</i>
              </b>
            </Typography>
            <Grid container justify="flex-start">
              <Typography color="primary">
                {movie.statistics.likeCount}
              </Typography>
              <ThumbUpIcon color="primary" />
              <Typography color="secondary">
                {movie.statistics.dislikeCount}
              </Typography>
              <ThumbDownIcon color="secondary" />
            </Grid>
            <br />
            <Typography color="textSecondary" align="left">
              Description:
            </Typography>
            <div>
              <ExpandCollapse
                previewHeight="94px"
                expandText="SHOW MORE"
                collapseText="SHOW LESS"
                ellipsisText=""
              >
                <pre align="left">{props.movie.snippet.description}</pre>
              </ExpandCollapse>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
