import { useTheme } from "../context/ThemeContext";
import { useStudents } from "../context/StudentContext";

function DashboardHeader() {
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useStudents();

  return (
    <header
      className={`border-b ${
        theme === "dark"
          ? "border-slate-800 bg-slate-900"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-xl font-bold">
            Student Portal
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Practical React Lab Series
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 sm:inline-block">
            ⭐ {favorites.length}
          </span>

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </div>

      <nav className="mx-auto flex max-w-7xl gap-6 px-4 pb-4 text-sm font-medium sm:px-6 lg:px-8">
        <a
          href="#"
          className="text-blue-600"
        >
          Dashboard
        </a>

        <a
          href="#"
          className="text-slate-500 hover:text-blue-600 dark:text-slate-400"
        >
          Students
        </a>
      </nav>
    </header>
  );
}

export default DashboardHeader;