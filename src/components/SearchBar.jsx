const SearchBar = ({ setSearchKey, handleSearch, searchingFor }) => {
  return (
    <div className="search">
      <input
        className="name"
        type="text"
        placeholder={`Search by ${searchingFor} name...`}
        onChange={(e) => {
          setSearchKey(e.target.value);
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            handleSearch();
          }
        }}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
