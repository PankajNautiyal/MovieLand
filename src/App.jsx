import React, { useState } from "react";
import { useEffect } from "react";
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com?apikey=c032e2d7";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const movieDetails = (movie) => {
    const imdbUrl = `https://www.imdb.com/title/${movie.imdbID}`;
    window.open(imdbUrl, "_blank");
  };

  const searchMovies = async (title) => {
    if (!title.trim()) return // Prevents empty searches

    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
    console.log(data); 
  };

  useEffect(() => {
    searchMovies("Animated");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") { // searches when  enter key is pressed
              searchMovies(searchTerm);
            }
          }}
        />
        <img
          src="search.svg"
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />  
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} onClick={()=>movieDetails(movie)} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movie found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
