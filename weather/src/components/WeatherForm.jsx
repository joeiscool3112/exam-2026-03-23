function WeatherForm({
  setName,
  input,
  setInput,
  addToRecent,

}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Typed:', input);
    setName(input);

    console.log('saving recent searches:', input);
    addToRecent(input);


  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        placeholder="Search city name..."
      />
      <button type="submit">Add City</button>
    </form>
  );
}

export default WeatherForm;