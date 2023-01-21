import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  const deletemovie=props.deletemovie
  console.log(props)
  return (
    
    <li className={classes.movie}>
      
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={()=>deletemovie(props.id)} style={{background:'grey',textcolor:"blue"}}>Delete</button>
    </li>
    
    
  );
};

export default Movie;
