import React from "react";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div style={{ padding: "20px" }}>
      <img
        src={movie.poster}
        alt={`${movie.title} poster`}
        style={{ width: "200px", height: "auto", marginBottom: "15px" }}
      />
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
