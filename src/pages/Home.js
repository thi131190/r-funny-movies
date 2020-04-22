import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Movie from "../components/Movie";

export default function Home(props) {
  const { movies, user } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container>
          {movies.length > 0 ? (
            movies
              .sort((a, b) => b.id - a.id)
              .map((movie) => (
                <Movie
                  movie={movie.info}
                  key={movie.id}
                  sharedBy={movie.sharedBy}
                />
              ))
          ) : (
            <h3>
              {!user
                ? "There is no movie. Please login to share a movie!"
                : "Please share a movie!"}{" "}
            </h3>
          )}
        </Container>
      </main>
    </React.Fragment>
  );
}
