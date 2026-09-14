import "./App.css";

import DashboardHeader from "./components/DashboardHeader";
import StudentCard from "./components/StudentCard";
import StatBadge from "./components/StatBadge";
import { studentData } from "./data/students";

function App() {
  return (
    <div className="app">
      <DashboardHeader />

      <main className="dashboard-container">
        <section className="dashboard-stats">
          <StatBadge
            label="Total Students"
            value={studentData.length}
          />

          <StatBadge
            label="Average GPA"
            value={(
              studentData.reduce(
                (sum, student) => sum + student.gpa,
                0
              ) / studentData.length
            ).toFixed(2)}
          />
        </section>

        <section
          id="students"
          className="student-section"
        >
          <div className="section-heading">
            <h2>Students</h2>
            <p>
              View student academic information
            </p>
          </div>

          <div className="student-grid">
            {studentData.map((student) => (
              <StudentCard
                key={student.id}
                {...student}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;