import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Container, Row, Col, CardGroup, Card } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function RegistrationView() {

  //Input Hook Section:
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  // Input Validation Variabales Error Hook Section:
  const [usernameerr, setUsernameErr] = useState('');
  const [passworderr, setPasswordErr] = useState('');
  const [emailerr, setEmailErr] = useState('');
  const [birthdayerr, setBirthdayErr] = useState('');

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
    if (!email) {
      setEmailErr('Email Required');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Email should has @ character');
      isReq = false;
    }
    if (!birthday) {
      setBirthdayErr('Birthday Required');
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios.post('https://myflix-2022.herokuapp.com/users/register', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          // onLoggedIn(null)
          alert('Registration successful, please login.');
          // window('/', '_self'); // '_self open the page in curent tab'
        })
        .catch(error => {
          console.error(error);
          alert('Unable to register!');
        });
    }
  };

  // const toLogin = () => {
  //   props.onLoggedIn(null);
  //   props.toggleRegister(true);
  //   console.log("clicked Back to Login");
  // };

  return (
    // <p>Salam Siavash</p>
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Please Register</Card.Title>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Usernam:</Form.Label>
                    <Form.Control type="text" placeholder='Enter Your Username' minLength={2} required onChange={e => setUsername(e.target.value)} />
                    {usernameerr && <p>{usernameerr}</p>}
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder='Enter Your Email Address' required onChange={e => setEmail(e.target.value)} />
                    {emailerr && <p>{emailerr}</p>}
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder='Enter Your Password' minLength={8} required onChange={e => setPassword(e.target.value)} />
                    {passworderr && <p>{passworderr}</p>}
                  </Form.Group>
                  <Form.Group controlId="formBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control type="date" placeholder='Enter Your Birthday' required onChange={e => setBirthday(e.target.value)} />
                    {birthdayerr && <p>{birthdayerr}</p>}
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
      <Row className="justify-content-center m-1">
        <Link to={"/"}>
          <a className="text-muted" type="button">
            I have an account.
          </a>
        </Link>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  })
};