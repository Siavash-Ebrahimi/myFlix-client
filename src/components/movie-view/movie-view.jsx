import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';

export default class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
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
                  <Button type="button" variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
          <Col md={2}></Col>
        </Row>
      </Container >
    );
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
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