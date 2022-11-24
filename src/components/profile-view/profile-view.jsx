import React, { useState, useEffect } from "react";
// import { Form, Button, Container, Row, Col, CardGroup, Card } from 'react-bootstrap';
import UserInfo from "./user-info";
import axios from "axios";
import { useState } from "react";
// import FavoriteMovies from "./favorite-movies";
// import UpdateUser from "./update-user";
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';


export default function ProfileView({ user, movies, onLoggedIn }) {
  const [userAllData, setUserAllData] = useState([]);
  const [favoriteMoviesList, setFavoriteMoviesList] = useState([]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameerr, setUsernameErr] = useState('');
  const [passworderr, setPasswordErr] = useState('');
  const [emailerr, setEmailErr] = useState('');
  const [birthdayerr, setBirthdayErr] = useState('');
  const token = localStorage.getItem('token');


  const getUser = () => {
    axios.get(`https://myflix-2022.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        setUserAllData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getUser();
  }, [])

  // Delete User Account. 
  const removeUser = () => {
    axios.delete(`https://myflix-2022.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        onLoggedIn(null)
        alert('Your account removed successful.');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Remove a Favorite Movie From List
  const removeFav = (id, index) => {
    axios.delete(`https://myflix-2022.herokuapp.com/users/${user}/movies/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        let favMovies = [...favoriteMoviesList];
        favMovies.splice(index, 1);
        setFavoriteMoviesList(favMovies);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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

  const updateSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    const isReq = validate();
    if (isReq) {
      axios.put(`https://myflix-2022.herokuapp.com/users/${user}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        },
        {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday
        })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Update successful, please login.');
        })
        .catch(error => {
          console.error(error);
          alert('Unable to update!');
        });
    }
  };

  const movieCollectionFavorite = () => {
    let getMovies = [];
    userAllData?.FavoriteMovies?.forEach((movie_id) => {
      let favMovies = movies.filter((movie) => movie._id === movie_id);
      getMovies = [...getMovies, ...favMovies];
    })
    setFavoriteMoviesList(getMovies);
  }

  useEffect(() => {
    movieCollectionFavorite();
    // Important note.
  }, [userAllData])



  return (
    <>
      <UserInfo name={userAllData.Username} email={userAllData.Email} />
      <form className='profile-form'>
        <h2>Want to change some info?</h2>
        <label>Username:</label>
        <input type='text' name='Username' placeholder={userAllData.Username} onChange={e => setUsername(e)} />
        {usernameerr && <p>{usernameerr}</p>}

        <label>Password:</label>
        <input type='password' name='Password' placeholder="***********" onChange={e => setPassword(e)} />
        {passworderr && <p>{passworderr}</p>}

        <label>Email address:</label>
        <input type='email' name='email' placeholder={userAllData.Email} onChange={e => setEmail(e)} />
        {emailerr && <p>{emailerr}</p>}

        <label>Birthday:</label>
        <input type='date' name='email' placeholder={userAllData.Birthday} onChange={e => setBirthday(e)} />
        {birthdayerr && <p>{birthdayerr}</p>}
        <div>
          <button type="submit" onClick={updateSubmit}>Update</button>
        </div>


      </form>

      <div>
        <h2>Favorite Movies:</h2>
        {favoriteMoviesList.map((movie, index) => (
          <div key={movie._id}>
            <div>
              <img variant="top" src={movie.ImagePath}></img>
            </div>
            <div>
              <p>{movie.Title}</p>
            </div>
            <div>
              <Link to={`/movies/${movie._id}`}>
                <button variant="primary">Get More</button>
              </Link>
              <button variant="primary" onClick={() => removeFav(movie._id, index)}>Remove Movie From Favorite List</button>
            </div>
            <div>
              <p>====================================</p>
            </div>
          </div>
        )
        )}
      </div>
      <div>
        <button type="submit" onClick={removeUser}>Delete My Account</button>
      </div>
    </>
  );
}