import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

// DEFINE PROFILE VIEW RIGHT HERE (No import needed)
const ProfileView = ({ onBackClick }) => {
  return (
    <div>
      <h1>Profile View</h1>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    fetch("https://boiling-beach-61559.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => ({
          id: doc._id,
          title: doc.Title,
          image: doc.ImagePath,
          description: doc.Description,
          genre: doc.Genre ? doc.Genre.Name : "",
          director: doc.Director ? doc.Director.Name : "",
        }));
        setMovies(moviesFromApi);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
      });
  }, []);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (showProfile) {
    return <ProfileView onBackClick={() => setShowProfile(false)} />;
  }

  if (movies.length === 0) {
    return <div className="main-view">Loading movies...</div>;
  }

  return (
    <div className="main-view">
      <button onClick={() => setShowProfile(true)}>Profile</button>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(movie) => setSelectedMovie(movie)}
        />
      ))}
    </div>
  );
};