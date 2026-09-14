import { useTheme } from "../context/ThemeContext";
import { useStudents } from "../context/StudentContext";

const DashboardHeader = () => {
  const {
    favorites,
  } = useStudents();

  const {
    theme,
    toggleTheme,
  } = useTheme();

  return (
    <header className="dashboard-header">
      <div className="header-top">
        <div>
          <h1>
            Student Dashboard
          </h1>

          <p>
            Manage and monitor student
            academic information
          </p>
        </div>

        <div className="header-actions">
          <span className="favorite-count">
             Favorites:{" "}
            {favorites.length}
          </span>

          <button
            className="theme-button"
            onClick={toggleTheme}
          >
            {theme === "light"
              ? " Dark"
              : " Light"}
          </button>
        </div>
      </div>

      <nav>
        <a href="#home">Home</a>
        <a href="#students">
          Students
        </a>
        <a href="#add-student">
          Add Student
        </a>
      </nav>
    </header>
  );
};

export default DashboardHeader;