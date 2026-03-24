function MovieDetails({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button style={closeBtn} onClick={onClose}>✖</button>

        <h2 style={{ color: 'black', marginTop: '8px' }}>{movie.Title}</h2>

        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : fallback}
          alt={movie.Title}
          onError={(e) => {
            e.currentTarget.src = fallback;
          }}
          style={imageStyle}
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
  inset: 0,
  background: 'rgba(0,0,0,0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  padding: '12px',
  boxSizing: 'border-box',
};

const modalStyle = {
  background: '#fff',
  padding: '20px',
  borderRadius: '12px',
  width: '100%',
  maxWidth: '800px',
  maxHeight: '80vh',
  overflowY: 'auto',
  position: 'relative',
  boxSizing: 'border-box',
};

const closeBtn = {
  position: 'absolute',
  top: '12px',
  right: '12px',
  width: '36px',
  height: '36px',
  border: 'none',
  borderRadius: '50%',
  background: 'red',
  color: '#fff',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  lineHeight: 1,
  fontSize: '18px',
};

const imageStyle = {
  width: '100%',
  maxWidth: '260px',
  height: 'auto',
  maxHeight: '320px',
  objectFit: 'cover',
  display: 'block',
  margin: '0 auto 16px',
};

export default MovieDetails;