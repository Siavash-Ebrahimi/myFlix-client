import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Container, Row, Col, CardGroup, Card } from 'react-bootstrap';
import axios from 'axios';

export default function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 8) {
      setPasswordErr('Password must be 8 characters long');
      isReq = false;
    }
    return isReq;
  };

  /* By click on Submit button "onClick={handleSubmit}", below function runs and 
  a POST request is made to the login endpoint of your myFlix API using Axios. */
  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* 1) Send a request to the server for authentication */
      axios.post('https://myflix-2022.herokuapp.com/login', {
        Username: username,
        Password: password
      })
        /* 2) If Username and Password were exist Then Server return jwt token and username 
           which are used for two purposes. First, to update the user state so that 
           the main-view is rendered again and, secondly, to save authentication data in 
           localStorage so that the next time you open your app, the browser remembers you’re 
           already logged in. */
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('No such user Siavash')
        });
    }
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <CardGroup>
            <Card style={{ marginTop: 150, marginBotoom: 50, width: 100 }}>
              <Card.Body>
                <Card.Title>Pelase Log in</Card.Title>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" placeholder='Enter Username' onChange={e => setUsername(e.target.value)} />
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder='Enter Password' onChange={e => setPassword(e.target.value)} />
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>
                  <Button style={{ marginTop: 10 }} variant="primary" type="submit" onClick={handleSubmit}>
                    Log In
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};