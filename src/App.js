import React, { useState, useEffect, useCallback, useRef } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, SetMovies] = useState([]);
  const [isLoading, SetIsLoading] = useState(false);
  const [error, SetError] = useState(null);
  const [Retry, SetRetry] = useState(true);
  const TitleRef=useRef('')
  const OpeningTextRef=useRef('')
  const ReleaseDateRef=useRef('')
  
  

  const FetchmovieHandler = useCallback(async () => {
    SetIsLoading(true);

    try {
      
        const response = await fetch("https://react-http-c38c6-default-rtdb.firebaseio.com/movies.json");
        if (!response.ok) {
          throw new Error("something went wrong.....retrying");
        }
        const data = await response.json();
        const LoadedMovies=[];
        for(const key in data){
          LoadedMovies.push({
            id:key,
            title:data[key].title,
            releaseDate:data[key].releaseDate,
            openingText:data[key].openingText
          })
          console.log(data)
        }
      

      
      SetMovies(LoadedMovies);
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
  const DeleteMovieHandler=async(item)=>{

    console.log(item)
    const response =await fetch(`https://react-http-c38c6-default-rtdb.firebaseio.com/movies/${item}.json`,{
      method:"DELETE",
      body:null,
      headers:{
        'Content-type':'application/json'
      }
    })
    const data=await response.json()
    console.log(data)
   await FetchmovieHandler()
  }

  let Content = <p>Found no movies</p>;
  if (movies.length > 0) {
    Content = <MoviesList deletemovie={DeleteMovieHandler} movies={movies} />;
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

  

const MovieSubmitHandler= async(event)=>{
  event.preventDefault()
 const NewMovie={
    title:TitleRef.current.value,
    releaseDate:ReleaseDateRef.current.value,
    openingText:OpeningTextRef.current.value

  }
  const respone =await fetch('https://react-http-c38c6-default-rtdb.firebaseio.com/movies.json',{
    method:"POST",
    body:JSON.stringify(NewMovie),
    headers:{
      'Content-type':'application/json'
    }
  })
  const data=await respone.json()
  console.log(data) 
  FetchmovieHandler()
  
}

  return (
    <React.Fragment>
      <section>
      <form onSubmit={MovieSubmitHandler}>
        <section>
        <label >Title</label>
        <input type='text' ref={TitleRef}></input>
        </section>
        <div><label >opening Text</label>
        <textarea rows='1' type='text' ref={OpeningTextRef}></textarea>
        </div>
        <section>
        <label >Release Date</label>
        <input  type='date' ref={ReleaseDateRef}></input>
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
