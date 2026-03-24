function MovieForm({ setMoviename, input, setInput, setCurrentPage }) {
  const handleSubmit = (e) => {
  e.preventDefault();

  console.log('Typed:', input);
  setMoviename(input);
  setCurrentPage(1);
};

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search movie name..."
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default MovieForm;