import { useState, useEffect } from 'react';
import MovieForm from './components/MovieForm';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import MovieHomePage from './components/MovieHomepage';
import './App.css';
import MoviePage from './components/MoviePage';
import MovieRecent from './components/MovieRecent';

function App() {
  const [moviename, setMoviename] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movieDetail, setMovieDetail] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [input, setInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [gotoPage, setGotoPage] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    if (!moviename.trim()) {
      setMovies([]);
      setHasSearched(false);
      setTotalPages(0);
      setCurrentPage(1);
      return;
    }

    async function fetchMovies() {
      setLoading(true);
      setHasSearched(true);

      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=42f63d77&s=${encodeURIComponent(moviename)}&page=${currentPage}`
        );
        const data = await res.json();

        setMovies(data.Search || []);
        setTotalPages(Math.ceil(Number(data.totalResults || 0) / 10));

        if (data.Search && data.Search.length > 0) {
          addToRecent(moviename);
        }
      } catch (err) {
        console.log(err);
        setMovies([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [moviename, currentPage]);

  useEffect(() => { //lưu vào local storage
    const saved = localStorage.getItem('recentMovieSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => { // lưu recent searches vào localstorage mỗi khi thay đổi
    localStorage.setItem('recentMovieSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);


  const addToRecent = (searchTerm) => { //thêm search vào recent (giới hạn 8 cái, mới nhất lên đầu)
    if (!searchTerm.trim()) return;

    setRecentSearches(prev => {
      const filtered = prev.filter(item => item.toLowerCase() !== searchTerm.toLowerCase());
      const updated = [searchTerm, ...filtered].slice(0, 8);
      return updated;
    });
  };


  const handleRecentClick = (term) => {
    setInput(term);
    setMoviename(term);
    setCurrentPage(1);
    setMovieDetail(null);
  };

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


   const handleGoToPage = (e) => {
    e.preventDefault();

    if (!gotoPage.trim()) {
      alert('Please enter a page number');
      return;
    }

    const pageNumber = Number(gotoPage);

    if (!Number.isInteger(pageNumber)) {
      alert('Page number must be an integer');
      return;
    }

    if (pageNumber < 1 || pageNumber > totalPages) {
      alert(`Please enter a page number between 1 and ${totalPages}`);
      return;
    }

    setCurrentPage(pageNumber);
    setGotoPage('');
  };
  return (
    <>
      <MovieHomePage/>
      <MovieForm 
      setMoviename={setMoviename} 
      moviename={moviename}
      input={input}
      setInput={setInput}
      setCurrentPage={setCurrentPage}/>


      <MovieRecent 
      recentSearches={recentSearches}
      handleRecentClick={handleRecentClick}/>

    
      

      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}

      {!loading && movies.length > 0 && (
        <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
      )}

      {!loading && hasSearched && movies.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          No results found for "{moviename}"
        </p>
      )}
      <MoviePage
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        gotoPage={gotoPage}
        setGotoPage={setGotoPage}
        handleGoToPage={handleGoToPage}
      />  
      
      <MovieDetails
        movie={movieDetail}
        onClose={() => setMovieDetail(null)}
      />

    </>
  );
}

export default App;