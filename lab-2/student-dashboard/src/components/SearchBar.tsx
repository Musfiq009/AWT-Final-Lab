import PropTypes from "prop-types";

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
}

const SearchBar = ({
  query,
  onQueryChange,
}: SearchBarProps) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by name or major..."
        value={query}
        onChange={(event) =>
          onQueryChange(event.target.value)
        }
        className="search-input"
      />
    </div>
  );
};

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  onQueryChange: PropTypes.func.isRequired,
};

export default SearchBar;