import React from "react";
import axios from "axios";
import Moment from 'react-moment';

import "./profile-view.scss";

import { MovieCard } from "../movie-card/movie-card";

import { Form, Card, Container, Row, Col } from "react-bootstrap";
import { setUser, updateUser } from "../../actions/actions";
import { connect } from "react-redux";
export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }

  getUser(token) {
    const username = localStorage.getItem("user");
    axios
      .get(`https://arret.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthday: response.data.birthday,
          favoriteMovies: response.data.favoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  editUser(e) {
    e.preventDefault();
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .put(
        `https://arret.herokuapp.com/users/${username}`,
        {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          birthday: this.state.birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthday: response.data.birthday,
        });
        localStorage.setItem("user", this.state.username);
        const data = response.data;
        console.log(data);
        console.log(this.state.username);
        alert("Your profile has been updated");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleFavorite = (movieId, action) => {
    const { user, favoriteMovies } = this.state;
    const accessToken = localStorage.getItem("token");
    if (accessToken !== null && user !== null) {
      // Add MovieID to Favorites

      if (action === "remove") {
        this.setState({
          favoriteMovies: favoriteMovies.filter((id) => id !== movieId),
        });
        axios
          .delete(
            `https://arret.herokuapp.com/users/${user}/movies/${movieId}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .then((res) => {
            console.log(`Movie removed from ${user} favorite movies`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  // Delete A User
  onDeleteUser() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    axios
      .delete(`https://arret.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert("The account was successfully deleted.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open("/", "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(value) {
    this.state.username = value;
  }

  setPassword(value) {
    this.state.password = value;
  }

  setEmail(value) {
    this.state.email = value;
  }

  setBirthday(value) {
    this.state.birthday = value;
  }

  render() {
    const { onBackClick, movies, handleFavorite } = this.props;

    const favoriteMovies = movies.filter((m) => {
      return this.state.favoriteMovies.includes(m._id);
    });

    return (
      <Container className="profile-view">
        <div className="top-elements d-flex flex-row justify-content-start align-items-baseline">
          <button
            className="button-55"
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </button>
        </div>

        <Row>
          <Col>
            <Card className="your-profile mt-4">
              <Card.Body>
                <Card.Title>
                  <h3>{this.state.username}</h3>
                </Card.Title>
                <Card.Text>
                  
                    <span className="email">Email: </span>
                    <span className="value">{this.state.email}</span>
                  
                </Card.Text>
                <Card.Text>
                  
                    <span className="birthday">Birthday: </span>
                    <Moment format="YYYY/MM/DD">{this.state.birthday}</Moment>
                  
                </Card.Text>
                <div className="delete-profile-button">
                  <button className="button-55" onClick={() => this.onDeleteUser()}>
                    Delete this account
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* UPDATE ACCOUNT */}

        <Row>
          <Col>
            <Card className="update-profile mt-4 mb-4">
              <Card.Body>
                <Card.Title>
                  <h3>Edit Account</h3>
                </Card.Title>
                <Form
                  className="formDisplay"
                  onSubmit={(e) => this.editUser(e)}
                >
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      name="Username:"
                      placeholder="New Username must be at least 5 characters long"
                      onChange={(e) => this.setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      name="Password:"
                      placeholder="New Password must be at least 8 characters"
                      onChange={(e) => this.setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      name="Email:"
                      placeholder="New Email"
                      onChange={(e) => this.setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="date"
                      name="Birthday:"
                      onChange={(e) => this.setBirthday(e.target.value)}
                    />
                  </Form.Group>
                    <button className="button-55 mt-2" type="submit">
                      Update
                    </button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* FAVORITE MOVIES */}

        <div>
          <h3>Favorite Movies:</h3>
        </div>

        <Row className="favoriteMovie-col">
          {favoriteMovies.map((movie) => (
            <Col sm={5} md={4} lg={3} key={movie._id}>
                <MovieCard movie={movie} key={movie._id}/>

                <button
                  className="button-55 ml-4"
                  variant="danger"
                  onClick={() => handleFavorite(movie._id, "remove")}
                >
                  Remove
                </button>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    user: state.user,
    movies: state.movies,
  };
};

export default connect(mapStateToProps, { setUser, updateUser })(ProfileView);