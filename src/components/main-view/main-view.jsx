import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom"; // CHANGED: HashRouter
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
  const [token, setToken] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      
      fetch("https://boiling-beach-61559.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
        .then((res) => res.json())
        .then((data) => {
          // We map the API data to match your frontend lowercase expectations
          const moviesFromApi = data.map((doc) => ({
            _id: doc._id,
            title: doc.title, // Backend is now lowercase
            imagePath: doc.imagePath, // Backend is now lowercase
            description: doc.description,
            genre: doc.genre,
            director: doc.director,
          }));
          setMovies(moviesFromApi);
        })
        .catch((err) => console.error("Failed to fetch movies:", err));
    }
  }, []);

  const handleLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <HashRouter> {/* CHANGED: Swapped BrowserRouter for HashRouter */}
      <NavigationBar user={user} onLoggedOut={handleLoggedOut} />
      <Container>
        <Routes>
          <Route
            path="/signup"
            element={
              user ? <Navigate to="/" /> : <SignupView />
            }
          />
          <Route
            path="/login"
            element={
              user ? <Navigate to="/" /> : <LoginView onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }} />
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>Loading...</Col>
              ) : (
                <MovieView movies={movies} />
              )
            }
          />
          <Route
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <ProfileView
                  user={user}
                  token={token}
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
                <Navigate to="/login" replace />
              ) : (
                <>
                  <Row className="justify-content-center">
                    <Col md={8}>
                      <Form className="mt-3 mb-4">
                        <Form.Control
                          type="text"
                          placeholder="Search movies..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </Form>
                    </Col>
                  </Row>
                  
                  <Row>
                    {movies.length === 0 ? (
                      <Col>The list is empty!</Col>
                    ) : (
                      filteredMovies.map((movie) => (
                        <Col md={3} key={movie._id} className="mb-4">
                          <MovieCard
                            movie={movie}
                            user={user}
                            token={token}
                            setUser={setUser}
                          />
                        </Col>
                      ))
                    )}
                  </Row>
                </>
              )
            }
          />
        </Routes>
      </Container>
    </HashRouter>
  );
};