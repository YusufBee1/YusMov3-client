import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, movies, onLoggedOut, setUser }) => {
  const [username, setUsername] = useState(user.Username);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday ? user.Birthday.split("T")[0] : "");
  const [password, setPassword] = useState("");

  // Filter movies to find favorites
  const favoriteMovies = movies.filter((m) =>
    user.FavoriteMovies && user.FavoriteMovies.includes(m._id)
  );

  const handleUpdate = (e) => {
    e.preventDefault();

    const data = {
        Username: username,
        Email: email,
        Birthday: birthday
    };
    if (password) data.Password = password;

    fetch(
      `https://boiling-beach-61559.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => {
          if (res.ok) return res.json();
          alert("Update failed");
      })
      .then((data) => {
        if(data) {
            alert("Profile updated!");
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
        }
      })
      .catch((err) => console.error("Update failed:", err));
  };

  const handleDelete = () => {
    fetch(
      `https://boiling-beach-61559.herokuapp.com/users/${user.Username}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password (optional)"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
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

        <Col md={12} className="mt-5">
          <h3>Favorite Movies</h3>
          <Row>
             {favoriteMovies.length === 0 ? (
                <p>No favorites yet.</p>
              ) : (
                  favoriteMovies.map((movie) => (
                    <Col md={3} key={movie._id} className="mb-4">
                      <MovieCard movie={movie} user={user} token={token} setUser={setUser} />
                    </Col>
                  ))
              )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};