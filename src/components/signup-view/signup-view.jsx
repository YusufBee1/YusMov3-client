import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

export const SignupView = ({ onBackClick }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://boiling-beach-61559-98f808484350.herokuapp.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email, birthday })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Signup failed");
        return res.json();
      })
      .then((data) => {
        alert("Signup successful, please login!");
        onBackClick();
      })
      .catch((err) => {
        console.error("Signup error:", err);
        alert("Signup failed.");
      });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow-sm">
            <h2 className="mb-4">Sign Up</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="signupUsername" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="signupPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="signupEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="signupBirthday" className="mb-4">
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </Form.Group>

              <Button type="submit" variant="success" className="w-100 mb-2">
                Sign Up
              </Button>

              <Button variant="secondary" onClick={onBackClick} className="w-100">
                Back to Login
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

SignupView.propTypes = {
  onBackClick: PropTypes.func.isRequired
};
