import "./App.css";
import DashboardHeader from "./components/DashboardHeader";
import StudentCard from "./components/StudentCard";
import StatBadge from "./components/StatBadge";
import { studentData } from "./data/students";

function App() {
  const averageGPA =
    studentData.reduce((sum, student) => sum + student.gpa, 0) /
    studentData.length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <DashboardHeader favoriteCount={0} />

      <main className="mx-auto w-[92%] max-w-7xl py-8 sm:py-10">
        {/* Welcome Section */}
        <section
          id="home"
          className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-6 text-white shadow-xl sm:p-8"
        >
          <div className="max-w-3xl">
            <span className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur-sm">
              Academic Overview
            </span>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome to Student Dashboard
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
              View and monitor student academic information, GPA, majors, and
              enrolled courses from one simple dashboard.
            </p>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <StatBadge
            label="Total Students"
            value={studentData.length}
          />

          <StatBadge
            label="Average GPA"
            value={averageGPA.toFixed(2)}
          />
        </section>

        {/* Students */}
        <section id="students" className="scroll-mt-24">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-blue-600">
                Student Directory
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Students
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                View student academic information
              </p>
            </div>

            <div className="w-fit rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
              {studentData.length} Students
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {studentData.map((student) => (
              <StudentCard
                key={student.id}
                {...student}
              />
            ))}
          </div>
        </section>

        {/* Courses */}
        <section
          id="courses"
          className="mt-12 scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Learning
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Available Courses
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Courses currently associated with students.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {Array.from(
              new Set(studentData.flatMap((student) => student.courses))
            ).map((course) => (
              <span
                key={course}
                className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-100"
              >
                {course}
              </span>
            ))}
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="mt-8 scroll-mt-24 rounded-3xl bg-slate-900 p-6 text-white shadow-lg sm:p-8"
        >
          <h2 className="text-2xl font-bold">About</h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Student Dashboard is a React and TypeScript based academic
            management interface designed to present student information in a
            clean and responsive layout.
          </p>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6">
        <p className="text-center text-sm text-slate-500">
          © 2026 Student Dashboard. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;