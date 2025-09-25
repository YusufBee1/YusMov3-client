import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Img
              variant="top"
              src={movie.image || "https://via.placeholder.com/600x400?text=No+Image"}
              alt={movie.title}
            />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.description}</Card.Text>

              <Button variant="secondary" onClick={onBackClick}>
                Back
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};

