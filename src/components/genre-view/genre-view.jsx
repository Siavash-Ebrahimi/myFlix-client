import React from 'react';
import { Button, Container, Row, Col, CardGroup, Card } from 'react-bootstrap';


export default function GenreView({ genre, onBackClick }) {
  return (
    // <p>Hello Genre</p>
    <Container style={{ marginTop: 50 }}>
      <CardGroup>
        <Card>
          <Card.Body>
            <Card.Title>{genre.Name}</Card.Title>
            <Card.Text >{genre.Description}</Card.Text>
            <Button type="button" variant="primary" onClick={() => { onBackClick() }}>Back</Button>
          </Card.Body>
        </Card>
      </CardGroup>
    </Container>

  );
}
