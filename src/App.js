import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const[movies,SetMovies]=useState([]);
  const[isLoading,SetIsLoading]=useState(false)
   async function FetchmovieHandler(){
    SetIsLoading(true)
   const response=await fetch('https://swapi.dev/api/films')
   const data=await response.json()
   
    
      const TransformedMovies=data.results.map(movieData=>{
        return {
          id:movieData.episode_id,
          title:movieData.title,
          openingText:movieData.opening_crawl,
          releaseDate:movieData.release_date
        }
      })
      SetMovies(TransformedMovies)
    SetIsLoading(false)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={FetchmovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length>0 && <MoviesList movies={movies} />}
        {isLoading && <p>Loading.....</p>}
        {!isLoading && movies.length===0 && <p>Found no Movies..</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
