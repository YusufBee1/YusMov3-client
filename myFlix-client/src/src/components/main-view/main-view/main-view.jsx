import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("https://your-api-url.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  if (selectedMovie) {
    return (
      <Container className="mt-4">
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        {movies.map((movie) => (
          <Col
            key={movie._id}
            md={4}
            sm={6}
            xs={12}
            className="d-flex align-items-stretch mb-4"
          >
            <MovieCard movie={movie} onMovieClick={setSelectedMovie} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
