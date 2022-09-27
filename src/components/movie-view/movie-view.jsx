import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import "./movie-view.scss";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick, isFavorite, handleFavorite } = this.props;

    if (!movie) return <div></div>;
    return (
      <Col
        className="container p-3 justify-content-center"
        md={9}
        lg={7}
        xl={6}
      >
        <Row className="justify-content-center">
          <Col sm={5} className="p-0">
            <img
              crossOrigin="anonymous"
              className="movie-img"
              src={movie.imageURL}
              alt=" Movie Image"
            />
          </Col>
          <Col sm={6}>
            <div className="mt-0">
              <div className="movie-title"><h1>{movie.title}</h1></div>
              {!isFavorite ? (
                <svg onClick={() => handleFavorite(movie._id, "add")} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-balloon-heart" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="m8 2.42-.717-.737c-1.13-1.161-3.243-.777-4.01.72-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577.687-1.355.587-2.377.236-3.061-.767-1.498-2.88-1.882-4.01-.721L8 2.42Zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063.045.041.089.084.132.129.043-.045.087-.088.132-.129 3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3.177 3.177 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798-.131.258-.245.689-.08 1.335.063.244.414.198.487-.043.21-.697.627-1.447 1.359-1.692.217-.073.304-.337.084-.398Z"/>
                </svg>
              ) : (
                <svg onClick={() => handleFavorite(movie._id, "remove")} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-balloon-heart-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8.49 10.92C19.412 3.382 11.28-2.387 8 .986 4.719-2.387-3.413 3.382 7.51 10.92l-.234.468a.25.25 0 1 0 .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05 1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115.16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2.376 2.376 0 0 1-.037-.289l.008.017a.25.25 0 1 0 .448-.224l-.235-.468ZM6.726 1.269c-1.167-.61-2.8-.142-3.454 1.135-.237.463-.36 1.08-.202 1.85.055.27.467.197.527-.071.285-1.256 1.177-2.462 2.989-2.528.234-.008.348-.278.14-.386Z"/>
                </svg>
              )}

              <span>{movie.year}</span>

              <div className="mt-3">
                <span className="fw-bold"><h5>Genre: </h5></span>
                <Link to={`/genres/${movie.genre.name}`}>
                  <span>{movie.genre.name} </span>
                </Link>
              </div>

              <div className="mt-2">
                <span className="fw-bold"><h5>Director: </h5></span>
                <Link to={`/directors/${movie.director.name}`}>
                  <span>{movie.director.name}</span>
                </Link>
              </div>

              <div className="mt-2">
                <span className="fw-bold"><h5>Description: </h5></span>
                <span className="value">{movie.description}</span>
              </div>

              <button
                className="button-55 mt-2"
                onClick={() => {
                  onBackClick(null);
                }}
              >
                Back
              </button>
            </div>
          </Col>
        </Row>
      </Col>
    );
  }
}

// MovieView.propTypes = {
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
// };