function MovieHomePage({
  setMoviename,
  setInput,
  setCurrentPage,
  setMovies,
  setTotalPages,
  setHasSearched,
  setMovieDetail,
  params
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
    window.history.pushState({}, '', '/');
  };


  return (
    <>
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
      <footer style={{ textAlign: 'center', marginBottom: '20px', color: '#888' }}>
        Click 'Movie search' to go back to dashboard
      </footer>
    </>
  );
}

export default MovieHomePage;