import React, { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Crow",
      description: "A gothic tale of love and vengeance.",
      poster: "https://m.media-amazon.com/images/I/51y0sP+VdPL._AC_.jpg"
    },
    {
      id: 2,
      title: "Beetlejuice",
      description: "The afterlife is much stranger than you think.",
      poster: "https://m.media-amazon.com/images/I/51VqtEtFPiL._AC_.jpg"
    },
    {
      id: 3,
      title: "Interview with the Vampire",
      description: "A haunting chronicle of two immortal vampires.",
      poster: "https://m.media-amazon.com/images/I/61G2rsKXNOL._AC_SY679_.jpg"
    }
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
    <div>
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
