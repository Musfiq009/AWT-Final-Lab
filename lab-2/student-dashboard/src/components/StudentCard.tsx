import { useState } from "react";
import PropTypes from "prop-types";

import CourseTag from "./CourseTag";
import StatBadge from "./StatBadge";

interface StudentCardProps {
  name: string;
  id: string;
  avatar: string;
  gpa: number;
  major: string;
  courses: string[];

  isFavorite?: boolean;
  onFavoriteChange?: (
    id: string,
    isFavorite: boolean
  ) => void;
}

const StudentCard = ({
  name,
  id,
  avatar,
  gpa,
  major,
  courses,
  isFavorite = false,
  onFavoriteChange,
}: StudentCardProps) => {
  const [favorite, setFavorite] =
    useState(isFavorite);

  const handleFavorite = () => {
    const newValue = !favorite;

    setFavorite(newValue);

    onFavoriteChange?.(
      id,
      newValue
    );
  };

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
          <p>ID: {id}</p>
        </div>
      </div>

      <button
        className={`favorite-button ${
          favorite ? "favorite-active" : ""
        }`}
        onClick={handleFavorite}
      >
        {favorite
          ? "★ Favorited"
          : "☆ Favorite"}
      </button>

      <div className="student-info">
        <p>
          <strong>Major:</strong>{" "}
          {major}
        </p>
      </div>

      <StatBadge
        label="GPA"
        value={gpa.toFixed(2)}
      />

      <div className="courses">
        <h4>Courses</h4>

        <div className="course-list">
          {courses.map((course, index) => (
            <CourseTag
              key={course}
              courseName={course}
              color={
                index % 2 === 0
                  ? "#dbeafe"
                  : "#dcfce7"
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

StudentCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  gpa: PropTypes.number.isRequired,
  major: PropTypes.string.isRequired,
  courses: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  isFavorite: PropTypes.bool,
  onFavoriteChange:
    PropTypes.func,
};

export default StudentCard;