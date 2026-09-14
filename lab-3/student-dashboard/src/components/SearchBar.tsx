import { useStudents } from "../context/StudentContext";
import { useTheme } from "../context/ThemeContext";

function SearchBar() {
  const { query, setQuery } = useStudents();
  const { theme } = useTheme();

  return (
    <div className="relative w-full md:max-w-md">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
        🔍
      </span>

      <input
        type="text"
        value={query}
        onChange={(event) =>
          setQuery(event.target.value)
        }
        placeholder="Search by name or major..."
        className={`w-full rounded-xl border py-3 pl-11 pr-10 outline-none transition focus:border-blue-500 ${
          theme === "dark"
            ? "border-slate-700 bg-slate-900 text-white"
            : "border-slate-300 bg-white text-slate-900"
        }`}
      />

      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;