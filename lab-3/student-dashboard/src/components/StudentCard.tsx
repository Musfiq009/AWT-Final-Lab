import CourseTag from "./CourseTag";
import StatBadge from "./StatBadge";

import {
  useStudents,
} from "../context/StudentContext";

interface StudentCardProps {
  name: string;
  id: string;
  avatar: string;
  gpa: number;
  major: string;
  courses: string[];
}

const StudentCard = ({
  name,
  id,
  avatar,
  gpa,
  major,
  courses,
}: StudentCardProps) => {
  const {
    favorites,
    toggleFavorite,
    removeStudent,
  } = useStudents();

  const isFavorite =
    favorites.includes(id);

  return (
    <div className="student-card">
      <div className="student-header">
        <img
          src={avatar}
          alt={name}
          className="student-avatar"
        />

        <div>
          <h3>{name}</h3>

          <p>
            ID: {id}
          </p>
        </div>
      </div>

      <div className="card-actions">
        <button
          className={`favorite-button ${
            isFavorite
              ? "favorite-active"
              : ""
          }`}
          onClick={() =>
            toggleFavorite(id)
          }
        >
          {isFavorite
            ? "★ Favorited"
            : "☆ Favorite"}
        </button>

        <button
          className="remove-button"
          onClick={() =>
            removeStudent(id)
          }
        >
          Remove
        </button>
      </div>

      <div className="student-info">
        <p>
          <strong>
            Major:
          </strong>{" "}
          {major}
        </p>
      </div>

      <StatBadge
        label="GPA"
        value={gpa.toFixed(2)}
      />

      <div className="courses">
        <h4>
          Courses
        </h4>

        <div className="course-list">
          {courses.map(
            (course, index) => (
              <CourseTag
                key={course}
                courseName={course}
                color={
                  index % 2 === 0
                    ? "#dbeafe"
                    : "#dcfce7"
                }
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCard;