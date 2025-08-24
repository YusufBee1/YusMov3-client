import React from "react";

export const MovieView = ({ movie, onBackClick }) => {
  if (!movie) return null;

  return (
    <div
      className="movie-view"
      style={{ border: "1px solid #666", padding: "1rem", borderRadius: "8px" }}
    >
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <button onClick={onBackClick} style={{ marginTop: "1rem" }}>
        Back
      </button>
    </div>
  );
};
