import React from "react";
import PropTypes from "prop-types";

import { MovieCard } from "../movie-card/movie-card";
// Import React Bootstrap Components
import { Container, Col, Card, Row, Button } from "react-bootstrap";

// Import custom SCSS
import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { genre, genreMovies, onBackClick } = this.props;

    return (
      <Container>
        <Card className="genre-view">
          <Card.Header className="genre-view-title p-0 bg-transparent"><h3>{genre.name}</h3></Card.Header>
          <Card.Body className="p-0">
          <span>{genre.description}</span>
          <h5 className="mt-4">Movies:</h5>
          <Row className="justify-content-center movie-view-width">
          {genreMovies.map((movie) => (
                <MovieCard movie={movie} key={movie._id}/>
          ))}
          </Row>
          </Card.Body>
          <Card.Footer className="genre-footer bg-transparent">
            <button
              className="button-55"
              onClick={() => {
                onBackClick();
              }}
            >
              Back
            </button>
          </Card.Footer>
        </Card>
      </Container>
    );
  }
}

GenreView.proptypes = {
  genre: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};