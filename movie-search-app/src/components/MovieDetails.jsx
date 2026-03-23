function MovieDetails({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button style={closeBtn} onClick={onClose}>✖</button>

        <h2 style={{
            color: 'black'
        }}>{movie.Title}</h2>
        <img
            src={movie.Poster !== 'N/A' ? movie.Poster : fallback}
            alt={movie.Title}
            onError={(e) => {
              e.currentTarget.src = fallback;
            }}
            style={{
              width: '50%',
              height: '320px',
              objectFit: 'cover',
            }}
          />
        <p><b>Genre:</b> {movie.Genre}</p>
        <p><b>Actors:</b> {movie.Actors}</p>
        <p><b>Plot:</b> {movie.Plot}</p>
        <p><b>Rating:</b> {movie.imdbRating}</p>
        <p><b>Runtime:</b> {movie.Runtime}</p>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle = {
  background: '#fff',
  color: '#000',
  padding: '20px',
  borderRadius: '12px',
  width: '800px',
  maxHeight: '80vh',
  overflowY: 'auto',
  position: 'relative',
};

const closeBtn = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  border: 'none',
  background: 'red',
  color: '#fff',
  padding: '5px 10px',
  cursor: 'pointer',
};

export default MovieDetails;