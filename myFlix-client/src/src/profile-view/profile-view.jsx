import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, movies, onLoggedOut, setUser }) => {
  const [updatedUser, setUpdatedUser] = useState(user);

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  if (!user) return null;

  const favoriteMovies = movies.filter((m) =>
    user.favorites.includes(m._id)
  );

  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(
      `https://boiling-beach-61559.herokuapp.com/users/${user.username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedUser),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        alert("Profile updated!");
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      })
      .catch((err) => console.error("Update failed:", err));
  };

  const handleDelete = () => {
    fetch(
      `https://boiling-beach-61559.herokuapp.com/users/${user.username}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then(() => {
        alert("Account deleted");
        onLoggedOut();
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <h3>User Profile</h3>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={updatedUser.username || ""}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, username: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={updatedUser.email || ""}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, email: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, password: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={
                  updatedUser.birthday
                    ? updatedUser.birthday.split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, birthday: e.target.value })
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
            <Button
              variant="danger"
              className="ms-2"
              onClick={handleDelete}
            >
              Delete Account
            </Button>
          </Form>
        </Col>

        <Col md={6}>
          <h3>Favorite Movies</h3>
          {favoriteMovies.length === 0 ? (
            <p>No favorites yet.</p>
          ) : (
            <Row>
              {favoriteMovies.map((movie) => (
                <Col md={6} key={movie._id} className="mb-4">
                  <MovieCard movie={movie} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};
