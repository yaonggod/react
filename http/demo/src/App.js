import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      const data = await response.json();

      if (!response.ok) {
        throw new Error('error')
      }

      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      })
      setMovies(transformedMovies);
    } catch (error) {
      setError('invalid request');
    }
    setIsLoading(false);
  }, [])

  useEffect(() => {
    setError(null);
    fetchMovies();
  }, [fetchMovies]);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && error && <p>{error}</p>}
        {!isLoading && movies.length > 0 &&<MoviesList movies={movies} />}
        {!isLoading && !error && movies.length === 0 && <p>no movies</p>}
        {isLoading && <p>loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
