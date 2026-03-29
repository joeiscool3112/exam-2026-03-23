import { useState, useCallback } from "react";
import "./App.css";

import SearchBar   from "./components/SearchBar";
import ProfileCard from "./components/ProfileCard";
import RepoList    from "./components/RepoList";


export default function App() {
  const [query,  setQuery]  = useState("");
  const [status, setStatus] = useState("idle");
  const [user,   setUser]   = useState(null);
  const [repos,  setRepos]  = useState([]);
  const [error,  setError]  = useState("");

  const handleSearch = useCallback(async () => {
    const username = query.trim();
    if (!username) return;

    setStatus("loading");
    setError("");
    setUser(null);
    setRepos([]);

    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?per_page=30&sort=updated`),
      ]);

      if (!userRes.ok) {
        if (userRes.status === 404) throw new Error(`User "${username}" not found.`);
        if (userRes.status === 403) throw new Error("API rate limit exceeded. Please wait.");
        throw new Error(`GitHub API error (${userRes.status})`);
      }

      const [userData, reposData] = await Promise.all([
        userRes.json(),
        reposRes.json(),
      ]);

      const sorted = [...reposData]
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 6);

      setUser(userData);
      setRepos(sorted);
      setStatus("success");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }, [query]);

  return (
    <div className="app">

      <header className="app-header">
        <h1>GitHub Finder</h1>
        <p>Search any GitHub user by username</p>
      </header>


      <SearchBar
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
        loading={status === "loading"}
      />


      {status === "error" && (
        <div className="error-msg">⚠ {error}</div>
      )}

      {status === "idle" && (
        <div className="state-box">
          <div className="icon">🔍</div>
          <div>Enter a username to get started</div>
          <p>Profile info and recent repos will appear here</p>
        </div>
      )}

      {status === "loading" && (
        <div className="state-box">
          <div className="spinner" />
          <div>Loading…</div>
        </div>
      )}


      {status === "success" && user && (
        <>
          <ProfileCard user={user} />
          <RepoList repos={repos} />
        </>
      )}
    </div>
  );
}
