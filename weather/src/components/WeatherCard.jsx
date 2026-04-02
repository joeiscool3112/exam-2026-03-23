function WeatherCard({ city }) {
  if (!city || !city.name) return null;
  return (
    <div className="weather-card">
      <h2>{city.name}</h2>
      <p>{city.weather[0].description}</p>
      <p>{city.main.temp} °C</p>
      <img
        src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
        alt={city.weather[0].description}
      />
    </div>
  );
}

export default WeatherCard;