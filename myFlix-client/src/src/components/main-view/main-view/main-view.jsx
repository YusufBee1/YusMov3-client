import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(storedToken || null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  const [movies, setMovies] = useState([
    { id: 1, title: "Inception", description: "A mind-bending thriller about dreams within dreams." },
    { id: 2, title: "Interstellar", description: "A space exploration epic to save humanity." },
    { id: 3, title: "The Matrix", description: "A hacker discovers the world is a simulation." }
  ]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const handleLogin = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  if (!user) {
    return showSignup ? (
      <SignupView onBackToLogin={() => setShowSignup(false)} />
    ) : (
      <>
        <LoginView onLoggedIn={handleLogin} />
        <button onClick={() => setShowSignup(true)}>Create Account</button>
      </>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      <button onClick={handleLogout}>Logout</button>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={() => setSelectedMovie(movie)}
        />
      ))}
    </div>
  );
};
