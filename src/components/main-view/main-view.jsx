import React from 'react';
import axios from 'axios';

import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

export default class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
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
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    /* We use the if with empty message (As actived if below) becuse 
       it will remain empty while the fetching process takes place 
       in the background. Until the data is finally fetched, 
       you don't want to display the message "The list is empty" 
       since you don't yet know whether the fetched array will be 
       empty or not*/
    // if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <>
        <div className="main-view">
          {selectedMovie
            ? <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }} />
            : movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
            ))
          }
        </div>
        <button>Sign Out</button>
      </>
    );
  }

  /* Using the React "componentDidMount" function & "Axios" Library ("axios")
     to fetch all Movies data through our cloud base server provider "Heroku" 
     that already stored our backend files on that, and our databased, MongoDB Atlas
     has already connected to "Heroku". Next we are using the React "this.setState({})" 
     function to add data to empty movie: [] array at constructor part. */
  componentDidMount() {
    axios.get('https://myflix-2022.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

}

// export default MainView;
