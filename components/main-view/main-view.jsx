import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Connect to your Real API
  useEffect(() => {
    fetch("https://boiling-beach-61559.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        // Map the API data to a format React expects
        const moviesFromApi = data.map((doc) => {
          return {
            id: doc._id,
            title: doc.Title,
            image: doc.ImagePath,
            description: doc.Description,
            genre: doc.Genre ? doc.Genre.Name : "",
            director: doc.Director ? doc.Director.Name : "",
          };
        });
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

  if (movies.length === 0) {
    return <div className="main-view">The list is empty! (Or loading...)</div>;
  }

  return (
    <div className="main-view">
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