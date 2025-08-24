import React, { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies] = useState([
    {
      id: 1,
      title: "The Crow (1994)",
      description:
        "A gothic rock musician returns from the dead to avenge his and his fiancée’s murder.",
    },
    {
      id: 2,
      title: "Beetlejuice (1988)",
      description:
        "A recently deceased couple hires a mischievous bio-exorcist to scare away new homeowners.",
    },
    {
      id: 3,
      title: "Interview with the Vampire (1994)",
      description:
        "A gothic tale of love, immortality, and despair as told by a centuries-old vampire.",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  return (
    <div className="main-view">
      <h1>🎬 YusMov Goth Edition</h1>
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
