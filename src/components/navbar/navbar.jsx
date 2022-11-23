import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Menubar({ user }) {

  const onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
    console.log('What to Do');
  };

  const isAuth = () => {
    if (typeof window == 'undefined') {
      return false;
    }
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  };

  return (
    <Navbar className="main-nav" sticky="top" fixed="top" bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand className="navbar-logo" href="/">myFlix App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && (<Nav.Link href={`./users/${user}`}>{user}</Nav.Link>)}
            {isAuth() && (<Nav.Link href={`/user/${user}`}>Profile</Nav.Link>)}
            {/* {isAuth() && (<Link to={`/users/${user}`}>
              testprof
            </Link>)} */}
            {isAuth() && (<Nav.Link href="/movie">Home</Nav.Link>)}
            {isAuth() && (<Nav.Link variant="link" onClick={() => { onLoggedOut() }}>Logout</Nav.Link>)}
            {/* {!isAuth() && (<Nav.Link href="/users/register">Register</Nav.Link>)} */}
            {!isAuth() && (<Link to={`/users/register`}>
              Register
            </Link>)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
