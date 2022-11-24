import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import Menubar from '../navbar/navbar';
import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import RegistrationView from '../registration-view/registration-view.jsx';
import ProfileView from '../profile-view/profile-view.jsx';

export default class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: null
    }
  }

  /* We have created a custom component method (A Call-Back Function) "setSelectedMovie" with an
     argument of "newSelectedMovie", then we add a React "this.setState ({})" function 
     to change the "state" of the "selectedMovie" key at this.state part in constructor() */
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user */
  onLoggedIn(authData) {
    this.setState({
      user: authData?.user?.Username || null
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://myflix-2022.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    })
  }

  render() {
    const { movies, user } = this.state;
    return (
      <Router>
        <Menubar user={user} />
        <Container>
          <Row className="main-view justify-content-md-center">

            <Route exact path="/" render={() => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return movies.map(m => (
                <Col md={3} key={m._id} style={{ marginTop: 50 }}>
                  <MovieCard movie={m} />
                </Col>
              ))
            }} />


            <Route path="/users/register" render={() => {
              return (
                < Col lg={8}>
                  <RegistrationView />
                </Col>
              );
            }} />


            <Route path="/movies/:movieId" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path="/directors/:name" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
              </Col>
            }
            } />

            <Route path="/genre/:name" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            }
            } />


            <Route path="/user/:user" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <ProfileView movies={movies} user={user} onLoggedIn={user => this.onLoggedIn(user)} onBackClick={() => history.goBack()} />
              </Col>
            }
            } />

          </Row>
        </Container>
      </Router >
    );
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

}
