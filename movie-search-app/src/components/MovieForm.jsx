import { useEffect } from 'react';

function MovieForm({
  setMoviename,
  input,
  setInput,
  setCurrentPage,
  addToRecent,
  params,

}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Typed:', input);
    setMoviename(input);
    setCurrentPage(1);

    params.set('q', input);
    params.set('page', '1');
    window.history.pushState({}, '', `?${params.toString()}`);

    console.log('saving recent searches:', input);
    addToRecent(input);

    const stored = JSON.parse(localStorage.getItem('recentMovieSearches')) || [];
    const updated = [...stored, input];
    localStorage.setItem('recentMovieSearches', JSON.stringify(updated));
  };

  useEffect(() => {
  if (!input.trim()) return;

  const timeout = setTimeout(() => {
    console.log('search:', input);

    setMoviename(input);
    setCurrentPage(1);

    params.set('q', input);
    params.set('page', '1');
    window.history.pushState({}, '', `?${params.toString()}`);
  }, 1000);

  return () => clearTimeout(timeout);
}, [input]);
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        placeholder="Search movie name..."
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default MovieForm;