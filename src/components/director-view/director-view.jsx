import React from "react";
import PropTypes from "prop-types";

import { MovieCard } from "../movie-card/movie-card";

// Import React Bootstrap Components
import { Container, Card, Row } from "react-bootstrap";

// Import custom SCSS
import "./director-view.scss";

export class DirectorView extends React.Component {
	render() {
		const { director, directorMovies, onBackClick } = this.props;

		return (
			<Container>
				<Card className="dir-view">
					<Card.Header className="dir-view-title p-0 bg-transparent">
						<h3>{director.name}</h3>
					</Card.Header>
					<Card.Body className="p-0">
						<h5>Born: </h5>
						{director.birth}
						<h5 className="mt-4">Bio:</h5>
						<span>{director.bio}</span>
						<h5 className="mt-4">Movies:</h5>
						<Row className="justify-content-center movie-view-width">
							{directorMovies.map((movie) => (
								<MovieCard movie={movie} />
							))}
						</Row>
					</Card.Body>
					<Card.Footer className="dir-footer bg-transparent">
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

DirectorView.proptypes = {
	Director: PropTypes.shape({
		Name: PropTypes.string.isRequired,
		Bio: PropTypes.string,
		Birthday: PropTypes.number,
	}).isRequired,
};
