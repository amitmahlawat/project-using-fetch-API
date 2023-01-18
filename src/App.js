import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, SetMovies] = useState([]);
  const [isLoading, SetIsLoading] = useState(false);
  const [error, SetError] = useState(null);
  const [Retry, SetRetry] = useState(true);
  const[Title,SetTitle]=useState('')
  const[OpeningText,SetOpeningText]=useState('')
  const[ReleaseDate,SetReleaseDate]=useState('')
  
  

  const FetchmovieHandler = useCallback(async () => {
    SetIsLoading(true);

    try {
      
        const response = await fetch("https://swapi.dev/api/films");
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
  } , []);

  useEffect(() => {
    console.log('firsttime')
  FetchmovieHandler()
  }, [FetchmovieHandler]);

  useEffect(()=>{
    if(error && Retry){
      console.log('running')
      var id= setInterval(()=>{
         FetchmovieHandler()
       },5000)}

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

const MovieSubmitHandler=(event)=>{
  event.preventDefault()
 const NewMovie={
    title:Title,
    releaseDate:ReleaseDate,
    openingText:OpeningText

  }
  console.log(NewMovie)
}
  return (
    <React.Fragment>
      <section>
      <form onSubmit={MovieSubmitHandler}>
        <section>
        <label >Title</label>
        <input type='text' onChange={(e)=>SetTitle(e.target.value)}></input>
        </section>
        <div><label >opening Text</label>
        <input type='text' onChange={(e)=>SetOpeningText(e.target.value)}></input>
        </div>
        <section>
        <label >Release Date</label>
        <input  type='date' onChange={(e)=>SetReleaseDate(e.target.value)}></input>
        </section>
        <section>
        <button>Add Movie</button>
        </section>
      </form>
      </section>
      <section>
        <button onClick={FetchmovieHandler}>Fetch Movies</button>
      </section>
      <section>{Content}</section>
    </React.Fragment>
  );
}

export default App;
