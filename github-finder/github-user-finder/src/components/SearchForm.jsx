import { useEffect } from 'react';

function SearchForm({ setSearchTerm, input, setInput, setEnterTerm }) {

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    console.log('searched:', input);
    setSearchTerm(input);
    setEnterTerm(input);
  };

  useEffect(() => {
    if (!input.trim()) return;

    const timeout = setTimeout(() => {
      console.log('presearch:', input);
      setSearchTerm(input);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [input]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;