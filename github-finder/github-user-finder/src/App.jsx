import { useState, useEffect  } from 'react'
import SearchForm from './components/searchForm';
import UserGithub from './components/UserGithub';
import RepoGithub from './components/RepoGithub';
import './App.css'


function App() {
  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [enterTerm, setEnterTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [user, setUser] = useState([]);
  const [repos, setRepos] = useState([]);


  useEffect(() => {
    if (!searchTerm.trim()) {
      setUser([]);
      setHasSearched(false);
      console.log("empty search or has been refreshed");
      return;
    }

    async function fetchUser() {
      setLoading(true);
      setHasSearched(true);

      try {
        const res = await fetch(
          `https://api.github.com/users/${encodeURIComponent(searchTerm)}`
        );
        const data = await res.json();

        setUser(data || []);
        console.log("user: ", data.login);

      } catch (err) {
        console.log(err);
        setUser([]);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();


  }, [searchTerm]);

  useEffect(() => {
 if (!enterTerm.trim()) { setRepos([]); return; }

     async function fetchRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${encodeURIComponent(enterTerm)}/repos`
        );
        const data = await res.json();

        setRepos(data || []);
        console.log("repos: ", data.length);

      } catch (err) {
        console.log(err);
        setRepos([]);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();

  }, [enterTerm]);

  const handleReset = () => {
  setInput('');
  setSearchTerm('');
  setEnterTerm('');
  setUser([]);
  setRepos([]);
  setHasSearched(false);
};

  return (
    <>

    <h1 onClick={handleReset} style={{ cursor: 'pointer' }}>
      GitHub Finder
    </h1>
    
    <SearchForm
    setSearchTerm={setSearchTerm}
    input={input}
    setInput={setInput}
    SearchTerm={searchTerm}
    setEnterTerm={setEnterTerm}
    />
    {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
    {!loading && hasSearched && !user && <p style={{ textAlign: 'center' }}>No user found.</p>}
    {!loading && !user.message && hasSearched && <UserGithub user={user} />}
    {!loading && user.message === "Not Found" && <p style={{ textAlign: 'center' }}>No user found with the name of {searchTerm}.</p>}
    {!loading && hasSearched && <RepoGithub repos={repos} />}
    </>
  )
}

export default App
