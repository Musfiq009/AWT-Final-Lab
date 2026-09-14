import {
  useEffect,
  useMemo,
  useState,
} from "react";

import "./App.css";

import DashboardHeader from "./components/DashboardHeader";
import StudentCard from "./components/StudentCard";
import StatBadge from "./components/StatBadge";
import SearchBar from "./components/SearchBar";
import SortControls, {
  SortOption,
} from "./components/SortControls";

import {
  studentData,
} from "./data/students";

import { Student } from "./types/student";

function App() {
  const [students, setStudents] =
    useState<Student[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [query, setQuery] =
    useState("");

  const [sortBy, setSortBy] =
    useState<SortOption>("default");

  const [favorites, setFavorites] =
    useState<string[]>([]);

  /*
   * Simulated API request
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setStudents(studentData);
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  /*
   * Search + sort
   */
  const displayedStudents =
    useMemo(() => {
      const filtered =
        students.filter(
          (student) => {
            const search =
              query.toLowerCase();

            return (
              student.name
                .toLowerCase()
                .includes(search) ||
              student.major
                .toLowerCase()
                .includes(search)
            );
          }
        );

      const sorted = [
        ...filtered,
      ];

      if (sortBy === "name") {
        sorted.sort((a, b) =>
          a.name.localeCompare(
            b.name
          )
        );
      }

      if (sortBy === "gpa") {
        sorted.sort(
          (a, b) =>
            b.gpa - a.gpa
        );
      }

      return sorted;
    }, [students, query, sortBy]);

  /*
   * Update browser title
   */
  useEffect(() => {
    document.title =
      `Dashboard — ${displayedStudents.length} Students`;
  }, [displayedStudents.length]);

  /*
   * Favorite handler
   */
  const handleFavoriteChange = (
    id: string,
    isFavorite: boolean
  ) => {
    setFavorites((previous) => {
      if (isFavorite) {
        return previous.includes(id)
          ? previous
          : [...previous, id];
      }

      return previous.filter(
        (favoriteId) =>
          favoriteId !== id
      );
    });
  };

  const averageGpa =
    students.length > 0
      ? students.reduce(
          (sum, student) =>
            sum + student.gpa,
          0
        ) / students.length
      : 0;

  return (
    <div className="app">
      <DashboardHeader
        favoriteCount={
          favorites.length
        }
      />

      <main className="dashboard-container">
        <section className="dashboard-stats">
          <StatBadge
            label="Total Students"
            value={students.length}
          />

          <StatBadge
            label="Average GPA"
            value={averageGpa.toFixed(2)}
          />

          <StatBadge
            label="Favorites"
            value={favorites.length}
          />
        </section>

        <section className="controls">
          <SearchBar
            query={query}
            onQueryChange={setQuery}
          />

          <SortControls
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </section>

        <section
          id="students"
          className="student-section"
        >
          <div className="section-heading">
            <h2>
              Students
            </h2>

            <p>
              Showing{" "}
              {displayedStudents.length}{" "}
              students
            </p>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>

              <p>
                Loading students...
              </p>
            </div>
          ) : displayedStudents.length ===
            0 ? (
            <div className="empty-state">
              No students found.
            </div>
          ) : (
            <div className="student-grid">
              {displayedStudents.map(
                (student) => (
                  <StudentCard
                    key={student.id}
                    {...student}
                    isFavorite={favorites.includes(
                      student.id
                    )}
                    onFavoriteChange={
                      handleFavoriteChange
                    }
                  />
                )
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;