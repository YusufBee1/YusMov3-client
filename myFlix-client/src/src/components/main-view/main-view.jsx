import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      fetch("https://boiling-beach-61559.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
        .then((res) => res.json())
        .then((data) => setMovies(data))
        .catch((err) => console.error("Failed to fetch movies:", err));
    }
  }, []);

  const handleLoggedOut = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <Container>
      <NavigationBar user={user} onLoggedOut={handleLoggedOut} />

      <Routes>
        <Route
          path="/signup"
          element={
            user ? <Navigate to="/" /> : <SignupView onLoggedIn={setUser} />
          }
        />
        <Route
          path="/login"
          element={
            user ? <Navigate to="/" /> : <LoginView onLoggedIn={setUser} />
          }
        />
        <Route
          path="/movies/:movieId"
          element={
            !user ? (
              <Navigate to="/login" />
            ) : (
              <MovieView movies={movies} />
            )
          }
        />
        <Route
          path="/profile"
          element={
            !user ? (
              <Navigate to="/login" />
            ) : (
              <ProfileView
                user={user}
                movies={movies}
                onLoggedOut={handleLoggedOut}
                setUser={setUser}
              />
            )
          }
        />
        <Route
          path="/"
          element={
            !user ? (
              <Navigate to="/login" />
            ) : (
              <Row>
                {movies.map((movie) => (
                  <Col md={4} key={movie._id} className="mb-4">
                    <MovieCard movie={movie} />
                  </Col>
                ))}
              </Row>
            )
          }
        />
      </Routes>
    </Container>
  );
};
