import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      fetch("http://localhost:8080/movies", {
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

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <>
                <Form className="mt-3 mb-4">
                  <Form.Control
                    type="text"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Form>
                <Row>
                  {filteredMovies.map((movie) => (
                    <Col md={4} key={movie._id} className="mb-4">
                      <MovieCard
                        movie={movie}
                        user={user}
                        setUser={setUser}
                      />
                    </Col>
                  ))}
                </Row>
              </>
            )
          }
        />
      </Routes>
    </Container>
  );
};
