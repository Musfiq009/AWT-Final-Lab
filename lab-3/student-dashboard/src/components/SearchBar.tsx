import { useStudents } from "../context/StudentContext";

const SearchBar = () => {
  const {
    query,
    setQuery,
  } = useStudents();

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by name or major..."
        value={query}
        onChange={(event) =>
          setQuery(
            event.target.value
          )
        }
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;