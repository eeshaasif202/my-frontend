

const SearchBar = ({ searchTerm, onSearchChange }) => (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={onSearchChange}
      />
    </div>
  );
  export default SearchBar;
  