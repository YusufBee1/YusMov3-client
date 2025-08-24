import React, { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  // 3 movies in state
  const [movies] = useState([
    { id: 1, title: "Inception", description: "A mind-bending thriller about dreams within dreams." },
    { id: 2, title: "Interstellar", description: "A space exploration epic to save humanity." },
    { id: 3, title: "The Matrix", description: "A hacker discovers the world is a simulation." }
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
