import { useEffect } from "react";

import "./App.css";

import DashboardHeader from "./components/DashboardHeader";
import StudentCard from "./components/StudentCard";
import StatBadge from "./components/StatBadge";
import SearchBar from "./components/SearchBar";
import SortControls from "./components/SortControls";
import AddStudentForm from "./components/AddStudentForm";

import {
  useStudents,
} from "./context/StudentContext";

import {
  useTheme,
} from "./context/ThemeContext";

function App() {
  const {
    students,
  } = useStudents();

  const {
    theme,
  } = useTheme();

  /*
   * Dynamic document title
   */
  useEffect(() => {
    document.title =
      `Dashboard — ${students.length} Students`;
  }, [students.length]);

  const averageGpa =
    students.length > 0
      ? students.reduce(
          (sum, student) =>
            sum + student.gpa,
          0
        ) / students.length
      : 0;

  return (
    <div
      className={`app theme-${theme}`}
    >
      <DashboardHeader />

      <main className="dashboard-container">
        <section className="dashboard-stats">
          <StatBadge
            label="Students"
            value={students.length}
          />

          <StatBadge
            label="Average GPA"
            value={averageGpa.toFixed(2)}
          />

          <StatBadge
            label="Courses"
            value={
              students.reduce(
                (total, student) =>
                  total +
                  student.courses
                    .length,
                0
              )
            }
          />
        </section>

        <section className="controls">
          <SearchBar />

          <SortControls />
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
              {students.length}{" "}
              students
            </p>
          </div>

          {students.length ===
          0 ? (
            <div className="empty-state">
              No students found.
            </div>
          ) : (
            <div className="student-grid">
              {students.map(
                (student) => (
                  <StudentCard
                    key={student.id}
                    {...student}
                  />
                )
              )}
            </div>
          )}
        </section>

        <AddStudentForm />
      </main>
    </div>
  );
}

export default App;