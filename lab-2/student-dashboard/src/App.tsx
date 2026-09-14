import "./App.css";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import DashboardHeader from "./components/DashboardHeader";
import StudentCard from "./components/StudentCard";
import StatBadge from "./components/StatBadge";
import SearchBar from "./components/SearchBar";
import SortControls, {
  type SortOption,
} from "./components/SortControls";

import { studentData } from "./data/students";
import type { Student } from "./types/student";

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] =
    useState<SortOption>("default");
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStudents(studentData);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const displayedStudents = useMemo(() => {
    const search = query.toLowerCase().trim();

    const filtered = students.filter((student) => {
      return (
        student.name.toLowerCase().includes(search) ||
        student.major.toLowerCase().includes(search)
      );
    });

    const sorted = [...filtered];

    if (sortBy === "name") {
      sorted.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    if (sortBy === "gpa") {
      sorted.sort((a, b) => b.gpa - a.gpa);
    }

    return sorted;
  }, [students, query, sortBy]);

  useEffect(() => {
    document.title =
      `Dashboard — ${displayedStudents.length} Students`;
  }, [displayedStudents.length]);

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
        (favoriteId) => favoriteId !== id
      );
    });
  };

  const averageGpa =
    students.length > 0
      ? students.reduce(
          (sum, student) => sum + student.gpa,
          0
        ) / students.length
      : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader
        favoriteCount={favorites.length}
      />

      <main className="mx-auto w-[92%] max-w-7xl py-8 sm:py-10">
        <section
          id="home"
          className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-6 text-white shadow-xl sm:p-8"
        >
          <div className="max-w-3xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-100">
              Academic Overview
            </p>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Student Dashboard
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
              Search, sort, and monitor student academic
              information from one place.
            </p>
          </div>
        </section>

        <section className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-900">
              Find Students
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Search by student name or major and choose
              a sorting option.
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <SearchBar
              query={query}
              onQueryChange={setQuery}
            />

            <SortControls
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>
        </section>

        <section
          id="students"
          className="scroll-mt-28"
        >
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Students
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-700">
                  {displayedStudents.length}
                </span>{" "}
                student
                {displayedStudents.length !== 1
                  ? "s"
                  : ""}
              </p>
            </div>

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="w-fit rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
              >
                Clear search
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

              <p className="mt-4 text-sm font-medium text-slate-500">
                Loading students...
              </p>
            </div>
          ) : displayedStudents.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
                🔍
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-800">
                No students found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try searching with a different name or
                major.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {displayedStudents.map((student) => (
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
              ))}
            </div>
          )}
        </section>
      </main>

      <footer
        id="about"
        className="mt-12 border-t border-slate-200 bg-white"
      >
        <div className="mx-auto flex w-[92%] max-w-7xl flex-col gap-2 py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-sm text-slate-500">
            Student Dashboard
          </p>

          <p className="text-xs text-slate-400">
            Academic information management system
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;