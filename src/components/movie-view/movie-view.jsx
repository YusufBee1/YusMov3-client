import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Card, Container, Row, Col } from "react-bootstrap";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            {movie.imagePath && (
              <Card.Img
                variant="top"
                src={movie.imagePath}
                alt={`${movie.title} poster`}
              />
            )}
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.description}</Card.Text>

              {movie.genre && (
                <Card.Text>
                  <strong>Genre:</strong> {movie.genre.name}
                </Card.Text>
              )}

              {movie.director && (
                <Card.Text>
                  <strong>Director:</strong> {movie.director.name}
                </Card.Text>
              )}

              <Link to="/">
                <Button variant="secondary">Back</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
