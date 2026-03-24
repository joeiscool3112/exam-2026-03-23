function MovieHomePage({ 
  setMoviename, 
  setInput, 
  setCurrentPage, 
  setMovies, 
  setTotalPages, 
  setHasSearched,
  setMovieDetail 
}) {
  
  const handleRefresh = () => {
    setInput('');
    setMoviename('');
    setCurrentPage(1);
    setMovies([]);
    setTotalPages(0);
    setHasSearched(false);
    setMovieDetail(null);
    console.log("refreshed");
  };

  return (
    <h1 
      onClick={handleRefresh}
      style={{ 
        cursor: 'pointer', 
        textAlign: 'center',
        margin: '30px 0 20px 0',
        userSelect: 'none'
      }}
    >
      Movie Search
    </h1>
  );
}

export default MovieHomePage;