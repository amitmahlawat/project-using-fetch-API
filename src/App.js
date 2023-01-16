import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, SetMovies] = useState([]);
  const [isLoading, SetIsLoading] = useState(false);
  const [error, SetError] = useState(null);
  const [Retry, SetRetry] = useState(true);
  

  const FetchmovieHandler = useCallback(async () => {
    SetIsLoading(true);

    try {
      
        const response = await fetch("https://swapi.dev/api/film");
        if (!response.ok) {
          throw new Error("something went wrong.....retrying");
        }
        const data = await response.json();
      

      const TransformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      SetMovies(TransformedMovies);
    } catch (error) {
      SetError(error.message);
      SetRetry(true)
    }
    SetIsLoading(false);
  }, []);

  useEffect(() => {
    console.log('firsttime')
  FetchmovieHandler()
  }, [FetchmovieHandler]);

  useEffect(()=>{
    if(error && Retry){
      console.log('running')
      var id= setInterval(()=>{
         FetchmovieHandler()
       },1000)}

       return ()=>clearInterval(id)
  })
  

  const clickHandler = () => {
    SetRetry(false);
    SetError(null)
      console.log("clicked");
  };

  let Content = <p>Found no movies</p>;
  if (movies.length > 0) {
    Content = <MoviesList movies={movies} />;
  }

  if (error) {
    Content = (
      <>
        <p>{error}</p>
        <button onClick={clickHandler}>cancel</button>
      </>
    );
  }

  if (isLoading) {
    Content = <p>Loading....</p>;
  }

  // if(error && !Retry){
  //   Content=<p>Found No Movies</p>
  // }

  return (
    <React.Fragment>
      <section>
        <button onClick={FetchmovieHandler}>Fetch Movies</button>
      </section>
      <section>{Content}</section>
    </React.Fragment>
  );
}

export default App;
