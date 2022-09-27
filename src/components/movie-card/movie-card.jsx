import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Col } from "react-bootstrap";

import { Link } from "react-router-dom";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (
    <Col xs="auto" className="mb-3 mx-0 justify-content-center">
     <Link className="movie-card-link" to={`/movies/${movie._id}`}>
      <Card className="movie-card mt-4">
        <Card.Body className="p-0">
            <Card.Img crossOrigin="anonymous" className="movie-card-img" src={movie.imageURL} style={{ height: "19rem" }} />
          <Card.Title className="movie-card-title px-2 mt-3 mb-0"><h3>{movie.title}</h3></Card.Title>
        </Card.Body>
        <Card.Footer className="movie-card-genre bg-transparent">{movie.genre.name}</Card.Footer>
      </Card>
      </Link>
      </Col>
    );
  }
}

// MovieCard.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     ImagePath: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Description: PropTypes.string.isRequired,
//     }),
//     Director: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Bio: PropTypes.string.isRequired,
//       Birthday: PropTypes.string.isRequired,
//     }),
//   }).isRequired,
//   onMovieClick: PropTypes.func.isRequired,
// }