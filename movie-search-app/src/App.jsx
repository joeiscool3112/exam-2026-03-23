import { useState, useEffect } from 'react';
import MovieForm from './components/MovieForm';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import './App.css';
function App() {
  const [moviename, setMoviename] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movieDetail, setMovieDetail] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!moviename.trim()) {
      setMovies([]);
      setHasSearched(false);
      return;
    }

    async function fetchMovies() {
      setLoading(true);
      setHasSearched(true);

      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=42f63d77&s=${encodeURIComponent(moviename)}`
        );
        const data = await res.json();
        setMovies(data.Search || []);
      } catch (err) {
        console.log(err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [moviename]);

  const handleSelectMovie = async (id) => {
    console.log('clicked:', id);

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=42f63d77&i=${id}&plot=full`
      );
      const data = await res.json();

      console.log('detail:', data);

      if (data.Response === 'True') {
        setMovieDetail(data);
      } else {
        console.log('API error:', data.Error);
        setMovieDetail(null);
        alert('cant find movie ' + (data.Error || 'error'));
      }
    } catch (err) {
      console.log('detail error:', err);
      setMovieDetail(null);
      alert('cant get details');
    }
  };

  return (
    <>
      <h1>Movie Search</h1>
      <MovieForm onAddMoviename={setMoviename} />

      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}

      {!loading && movies.length > 0 && (
        <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
      )}

      {!loading && hasSearched && movies.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          No results found for "{moviename}"
        </p>
      )}

      <MovieDetails
        movie={movieDetail}
        onClose={() => setMovieDetail(null)}
      />
    </>
  );
}

export default App;