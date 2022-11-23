import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class MovieView extends React.Component {

  addMovieToFavorites(e) {
    const { movie } = this.props;
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    e.preventDefault();
    axios.post(`https://myflix-2022.herokuapp.com/users/${username}/movies/${movie._id}`,
      { username: localStorage.getItem("user") },
      { headers: { Authorization: `Bearer ${token}` }, }
    )
      .then((response) => {
        console.log(response);
        alert("Movie added");
      })
      .catch((error) => console.error(error));
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col md={2}></Col>
          <Col>
            <CardGroup>
              <Card style={{ marginTop: 100, marginBotoom: 50, maxWidth: 500 }}>
                <Card.Img variant="top" src={movie.ImagePath} crossOrigin="anonymous" />
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>  </Card.Text>
                  <Card.Subtitle>Description:</Card.Subtitle>
                  <Card.Text style={{ flex: 1 }}>{movie.Description}</Card.Text>
                  <Card.Subtitle>Movie Genre:</Card.Subtitle>
                  <Card.Text style={{ flex: 1 }}>{movie.Genre.Name}</Card.Text>
                  <Card.Subtitle>Director:</Card.Subtitle>
                  <Card.Text style={{ flex: 1 }}>{movie.Director.Name}</Card.Text>

                  <Link to={`/directors/${movie.Director.Name}`}>
                    <p><a>Director</a></p>
                  </Link>

                  <Link to={`/genre/${movie.Genre.Name}`}>
                    <Button variant="link">Genre</Button>
                  </Link>

                  <Button type="button" variant="primary" onClick={() => { onBackClick() }}>Back</Button>

                  <Button type="button" variant="primary" style={{ marginLeft: 10 }} onClick={(e) => this.addMovieToFavorites(e)}>Add to favorites</Button>

                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
          <Col md={2}></Col>
        </Row>
      </Container >
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    ImagePath: PropTypes.string,
    Description: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string
    })
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};