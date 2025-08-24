import React from "react";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
