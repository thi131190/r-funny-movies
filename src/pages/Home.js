import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Movie from "../components/Movie";

export default function Home(props) {
  const { movies } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container>
          {movies.length > 0 &&
            movies
              .sort((a, b) => b.id - a.id)
              .map((movie, index) => (
                <Movie
                  movie={movie.info}
                  key={movie.id}
                  sharedBy={movie.sharedBy}
                />
              ))}
        </Container>
      </main>
    </React.Fragment>
  );
}
