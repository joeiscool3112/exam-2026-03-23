function MovieList({ movies, onSelectMovie }) {
  const fallback =
    'https://png.pngtree.com/png-vector/20221125/ourlarge/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg';

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '20px',
        marginTop: '30px',
      }}
    >
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          onClick={() => onSelectMovie(movie.imdbID)}
          style={{
            background: '#4d4d4d',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            transition: '0.2s',
            cursor: 'pointer',
          }}
        >
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : fallback}
            alt={movie.Title}
            onError={(e) => {
              e.currentTarget.src = fallback;
            }}
            style={{
              width: '100%',
              height: '320px',
              objectFit: 'cover',
            }}
          />
          <div style={{ padding: '12px' }}>
            <h3 style={{ color: 'white', margin: '0 0 8px' }}>
              {movie.Title}
            </h3>
            <p style={{ color: '#ddd', margin: '0 0 6px' }}>
              {movie.Year}
            </p>
            <p style={{ color: '#bbb', margin: 0 }}>
              imdbID: {movie.imdbID}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieList;