import React from 'react';
import PropTypes from 'prop-types';

import { Button, Card, CardGroup } from 'react-bootstrap';

export default class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <CardGroup>
        <Card>
          <Card.Img variant="top" src={movie.ImagePath} crossOrigin="anonymous" />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text minLength={100} style={{ flex: 1 }}>{movie.Description}</Card.Text>
            <Button variant="primary" onClick={() => onMovieClick(movie)}>Get More</Button>
          </Card.Body>
        </Card>
      </CardGroup>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};