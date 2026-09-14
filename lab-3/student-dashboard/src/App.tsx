import "./App.css";
import { useEffect } from "react";

import DashboardHeader from "./components/DashboardHeader";
import StudentCard from "./components/StudentCard";
import StatBadge from "./components/StatBadge";
import SearchBar from "./components/SearchBar";
import SortControls from "./components/SortControls";
import AddStudentForm from "./components/AddStudentForm";

import { useStudents } from "./context/StudentContext";
import { useTheme } from "./context/ThemeContext";

function App() {
  const {
    students,
    displayedStudents,
    favorites,
    loading,
  } = useStudents();

  const { theme } = useTheme();


  useEffect(() => {
    document.title = `Dashboard — ${displayedStudents.length} Students`;
  }, [displayedStudents.length]);

  const averageGpa =
    students.length > 0
      ? students.reduce(
          (sum, student) => sum + student.gpa,
          0
        ) / students.length
      : 0;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-slate-950 text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <DashboardHeader />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Student Dashboard
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Manage and explore student information.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
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
        </div>

        <AddStudentForm />

        <section>
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <SearchBar />
            <SortControls />
          </div>

          {loading ? (
            <div className="flex min-h-64 flex-col items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

              <p className="mt-4 text-slate-500">
                Loading students...
              </p>
            </div>
          ) : displayedStudents.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-700">
              <p className="font-semibold">
                No students found.
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search query.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {displayedStudents.map((student) => (
                <StudentCard
                  key={student.id}
                  name={student.name}
                  id={student.id}
                  avatar={student.avatar}
                  gpa={student.gpa}
                  major={student.major}
                  courses={student.courses}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500 dark:border-slate-800">
        Student Dashboard — React Lab 3
      </footer>
    </div>
  );
}

export default App;