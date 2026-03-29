// components/SearchBar.jsx

export default function SearchBar({ value, onChange, onSearch, loading }) {
  const handleKey = (e) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search GitHub username..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
        autoComplete="off"
        autoFocus
      />
      <button onClick={onSearch} disabled={loading}>
        {loading ? "Searching…" : "Search"}
      </button>
    </div>
  );
}
