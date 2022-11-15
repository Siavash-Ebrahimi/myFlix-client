import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Container, Row, Col, CardGroup, Card } from 'react-bootstrap';

export default function RegisterView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Please Register</Card.Title>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.label>Usernam:</Form.label>
                    <Form.Control type="text" placeholder='Enter Your Username' minLength={6} required onChange={e => setUsername(e.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder='Enter Your Email Address' required onChange={e => setEmail(e.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder='Enter Your Password' minLength={8} required onChange={e => setPassword(e.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="formBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control type="date" placeholder='Enter Your Birthday' required onChange={e => setBirthday(e.target.value)} />
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Register
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

RegisterView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};