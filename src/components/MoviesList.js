import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {
  console.log(props.movies)
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
       
        <Movie deletemovie={props.deletemovie} key={movie.id}
        id={movie.id}
        title={movie.title}
        releaseDate={movie.releaseDate}
        openingText={movie.openingText}>
          
          
          </Movie>
      ))}
    </ul>
  );
};

export default MovieList;
