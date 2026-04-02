import { useState, useEffect } from 'react'
import WeatherForm from './components/WeatherForm'
import WeatherCard from './components/WeatherCard'
import './App.css'

function App() {
  const [name, setName] = useState('');
  const [city, setCity] = useState([]);
  const [input, setInput] = useState('');

  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('recentCitySearches'));
      return Array.isArray(stored) ? stored : [];
    } catch (error) {
      console.log('localStorage read error:', error);
      return [];
    }
  });

  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!name.trim()) {
      setCity([]);
      setHasSearched(false);
      console.log("empty search or has been refreshed");
      return;
    }

    async function fetchCity() {
      setLoading(true);
      setHasSearched(true);

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(name)}&appid=73b569ae622a1de19b12eb599eb7547b&units=metric`
        );
        const data = await res.json();

        setCity(data || []);
        console.log("cityname: ", name);
      } catch (err) {
        console.log(err);
        setCity([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCity();
  }, [name]);

  useEffect(() => {
    localStorage.setItem(
      'recentCitySearches',
      JSON.stringify(recentSearches)
    );
  }, [recentSearches]);

  const addToRecent = (searchTerm) => {
    if (!searchTerm.trim()) return;
    if (!city.name || city.name.toLowerCase() !== searchTerm.toLowerCase()) return;

    setRecentSearches((prev) => {
      const filtered = prev.filter(
        (item) => item.toLowerCase() !== searchTerm.toLowerCase()
      );

      const updated = [searchTerm, ...filtered].slice(0, 8);
      return updated;
    });
  };

  const removeFromRecent = (cityToRemove) => {
    setRecentSearches((prev) =>
      prev.filter(
        (item) => item.toLowerCase() !== cityToRemove.toLowerCase()
      )
    );
  };

  const handleRecentClick = (cityName) => {
    setName(cityName);
    setInput(cityName);
  };

  return (
  <div className="app-container">
    <WeatherForm
      setName={setName}
      input={input}
      setInput={setInput}
      addToRecent={addToRecent}
    />

    {recentSearches.length > 0 && (
      <div className="recent-searches">
        <h3>Recent Searches</h3>

        {recentSearches.map((item, index) => (
          <div key={index} className="recent-item">
            <button onClick={() => handleRecentClick(item)}>
              {item}
            </button>

            <button onClick={() => removeFromRecent(item)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    )}

    {loading && <p>Loading...</p>}
    {!loading && hasSearched && !city.name && <p>City not found.</p>}
    {!loading && city.name && <WeatherCard city={city} />}
  </div>

  )
}

export default App