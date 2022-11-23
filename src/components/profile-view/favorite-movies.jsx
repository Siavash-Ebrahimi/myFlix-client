import React from "react";
import { Link } from "react-router-dom";
export default function FavoriteMovies({ movies }) {

  return (
    <div>
      <h2>Favorite Movies </h2>
      {favoriteMovieList.map((movies) => {
        return (
          <div key={movies._id}>
            <img src={movies.ImagePath} />
            <Link to={`/movies/${movies._id}`}>
              <h4>{movies.Titel}</h4>
            </Link>
            <button variant="secondary" onClick={() => removeFav(movies._id)}>Remove from list</button>
          </div>
        )
      })
      }
    </div>
  )
}