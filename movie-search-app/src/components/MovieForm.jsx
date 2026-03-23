import { useState } from 'react';

function MovieForm({ onAddMoviename }) {
  const [moviename, setMoviename] = useState('');

  const handleSubmit = (e) => {
  e.preventDefault();
  if (!moviename.trim()) return;

  console.log('Search:', moviename);
  onAddMoviename(moviename);
  setMoviename('');
};

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={moviename}
        onChange={(e) => setMoviename(e.target.value)}
        placeholder="Search movie name..."
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default MovieForm;