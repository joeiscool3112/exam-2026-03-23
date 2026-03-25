function MovieForm({ setMoviename, input, setInput, setCurrentPage, addToRecent }) {
  const handleSubmit = (e) => {
  e.preventDefault();
  console.log('Typed:', input);
  setMoviename(input);
  setCurrentPage(1);
  console.log("saving recent searches:", input);
  addToRecent(input);
  const stored = JSON.parse(localStorage.getItem('recentMovieSearches')) || [];
  const updated = [...stored, input];
  localStorage.setItem('recentMovieSearches', JSON.stringify(updated));

};

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setMoviename(e.target.value);
        }}
        placeholder="Search movie name..."
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default MovieForm;