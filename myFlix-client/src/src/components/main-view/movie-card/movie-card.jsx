import React from "react";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div 
      className="movie-card" 
      onClick={() => onMovieClick(movie)}
      style={{ border: "1px solid #ccc", padding: "10px", margin: "10px", cursor: "pointer" }}
    >
      <h3>{movie.title}</h3>
      <p>{movie.description}</p>
    </div>
  );
};
