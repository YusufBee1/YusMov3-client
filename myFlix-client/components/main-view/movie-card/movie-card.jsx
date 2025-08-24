import React from "react";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      className="movie-card"
      style={{
        border: "1px solid #444",
        padding: "1rem",
        margin: "0.5rem",
        borderRadius: "8px",
        cursor: "pointer",
      }}
      onClick={() => onMovieClick(movie)}
    >
      <h3>{movie.title}</h3>
      <p>{movie.description}</p>
    </div>
  );
};
