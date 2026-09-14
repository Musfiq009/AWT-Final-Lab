// lab-2/student-dashboard/src/components/SearchBar.tsx
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
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
      </div>

      <input
        type="text"
        placeholder="Search by name or major..."
        value={query}
        onChange={(event) =>
          onQueryChange(event.target.value)
        }
        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
      />

      {query && (
        <button
          type="button"
          onClick={() => onQueryChange("")}
          className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 transition hover:text-slate-700"
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  onQueryChange: PropTypes.func.isRequired,
};

export default SearchBar;