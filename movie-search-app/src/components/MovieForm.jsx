function MovieForm({ moviename, setMoviename }) {
  const handleSubmit = (e) => {
  e.preventDefault();
  if (!moviename.trim()) return;

  console.log('Search:', moviename);
  setMoviename(moviename);
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