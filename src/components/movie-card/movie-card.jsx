import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, user, token, setUser }) => {

  const isFavorite = user.FavoriteMovies && user.FavoriteMovies.includes(movie._id);

  const addFavorite = () => {
    fetch(
      `https://boiling-beach-61559.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add favorite");
        }
        return res.json();
      })
      .then((updatedUser) => {
        // Update local storage and state with the new user object
        if (updatedUser) {
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
            alert("Added to favorites!");
        }
      })
      .catch((err) => console.error("Add favorite failed:", err));
  };

  const removeFavorite = () => {
    fetch(
      `https://boiling-beach-61559.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to remove favorite");
        }
        return res.json();
      })
      .then((updatedUser) => {
        if (updatedUser) {
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
            alert("Removed from favorites!");
        }
      })
      .catch((err) => console.error("Remove favorite failed:", err));
  };

  return (
    <Card className="h-100">
      {movie.imagePath && (
        <Card.Img variant="top" src={movie.imagePath} alt={`${movie.title} poster`} style={{ height: "300px", objectFit: "cover" }} />
      )}
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description.substring(0, 100)}...</Card.Text>

        <Link to={`/movies/${movie._id}`}>
          <Button variant="primary" className="me-2">
            Open
          </Button>
        </Link>

        {!isFavorite ? (
          <Button variant="outline-success" size="sm" onClick={addFavorite}>
            + Fav
          </Button>
        ) : (
          <Button variant="outline-danger" size="sm" onClick={removeFavorite}>
            - Fav
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    imagePath: PropTypes.string,
  }).isRequired,
  user: PropTypes.object,
  setUser: PropTypes.func,
  token: PropTypes.string
};