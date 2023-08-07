import { Input, Button } from "@mantine/core";
const SearchBar = ({ searchKey, setSearchKey, handleSearch, searchingFor }) => {
  return (
    <div className="search">
      <Input
        radius="xl"
        className="searchInput"
        type="text"
        value={searchKey}
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
      <Button color="green" radius="xl" size="md" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
