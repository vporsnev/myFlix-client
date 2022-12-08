import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { MovieCard } from "../movie-card/movie-card";
import PropTypes from "prop-types";

const mapStateToProps = (state) => {
	const { visibilityFilter } = state;
	return { visibilityFilter };
};

function MoviesList(props) {
	const { movies, visibilityFilter } = props;
	let filteredMovies = movies;

	if (visibilityFilter !== "") {
		filteredMovies = movies.filter((m) =>
			m.title.toLowerCase().includes(visibilityFilter.toLowerCase())
		);
	}

	if (!movies) return <div className="main-view" />;

	return (
		<>
			<Row className="justify-content-center movie-view-width mx-auto">
				<Col sm={12} xl={11} className="mt-3">
					<Container fluid>
						<VisibilityFilterInput visibilityFilter={visibilityFilter} />
					</Container>
				</Col>
			</Row>
			<Row className="justify-content-center movie-view-width mx-auto">
				{filteredMovies.map((m) => (
					<MovieCard movie={m} key={m._id} />
				))}
			</Row>
		</>
	);
}

MoviesList.propTypes = {
	movies: PropTypes.arrayOf(
		PropTypes.shape({
			filter: PropTypes.func,
		})
	),
	visibilityFilter: PropTypes.string,
};

export default connect(mapStateToProps)(MoviesList);
