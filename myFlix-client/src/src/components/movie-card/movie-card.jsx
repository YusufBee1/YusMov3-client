import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, user, setUser }) => {
  const token = localStorage.getItem("token");

  const isFavorite = user?.favorites?.includes(movie._id);

  const addFavorite = () => {
    fetch(
      `https://boiling-beach-61559.herokuapp.com/users/${user.username}/movies/${movie._id}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((updatedUser) => {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      })
      .catch((err) => console.error("Add favorite failed:", err));
  };

  const removeFavorite = () => {
    fetch(
      `https://boiling-beach-61559.herokuapp.com/users/${user.username}/movies/${movie._id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((updatedUser) => {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      })
      .catch((err) => console.error("Remove favorite failed:", err));
  };

  return (
    <Card>
      {movie.imagePath && (
        <Card.Img variant="top" src={movie.imagePath} alt={`${movie.title} poster`} />
      )}
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>

        <Link to={`/movies/${movie._id}`}>
          <Button variant="primary" className="me-2">
            Open
          </Button>
        </Link>

        {!isFavorite ? (
          <Button variant="outline-success" onClick={addFavorite}>
            + Favorite
          </Button>
        ) : (
          <Button variant="outline-danger" onClick={removeFavorite}>
            – Remove
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
};
