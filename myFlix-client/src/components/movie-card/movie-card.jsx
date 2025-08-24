import React from "react";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => onMovieClick(movie)}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        cursor: "pointer",
        width: "200px"
      }}
    >
      <img
        src={movie.poster}
        alt={`${movie.title} poster`}
        style={{ width: "100%", height: "auto", marginBottom: "10px" }}
      />
      <h2>{movie.title}</h2>
    </div>
  );
};
