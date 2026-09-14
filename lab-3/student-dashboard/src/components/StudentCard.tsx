import PropTypes from "prop-types";

import CourseTag from "./CourseTag";

import { useStudents } from "../context/StudentContext";
import { useTheme } from "../context/ThemeContext";

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

  const { theme } = useTheme();

  const isFavorite = favorites.includes(id);

  const gpaPercentage = (gpa / 4) * 100;

  const gpaStyle =
    gpa >= 3.5
      ? {
          text: "text-green-600",
          bar: "bg-green-500",
        }
      : gpa >= 3
        ? {
            text: "text-yellow-600",
            bar: "bg-yellow-500",
          }
        : {
            text: "text-red-600",
            bar: "bg-red-500",
          };

  return (
    <article
      className={`overflow-hidden rounded-2xl border shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
        theme === "dark"
          ? "border-slate-800 bg-slate-900"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={avatar}
                alt={name}
                className="h-16 w-16 rounded-full object-cover ring-4 ring-blue-50 dark:ring-slate-800"
              />

              <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-500 dark:border-slate-900" />
            </div>

            <div>
              <h3 className="font-bold">
                {name}
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                ID: {id}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => toggleFavorite(id)}
            className={`rounded-lg px-3 py-2 text-lg transition ${
              isFavorite
                ? "bg-yellow-100 text-yellow-600"
                : "bg-slate-100 text-slate-400 dark:bg-slate-800"
            }`}
            title={
              isFavorite
                ? "Remove from favorites"
                : "Add to favorites"
            }
          >
            {isFavorite ? "★" : "☆"}
          </button>
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Major
          </p>

          <p className="mt-1 font-semibold">
            {major}
          </p>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold">
              GPA
            </span>

            <span
              className={`font-bold ${gpaStyle.text}`}
            >
              {gpa.toFixed(2)} / 4.00
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className={`h-full rounded-full transition-all duration-700 ${gpaStyle.bar}`}
              style={{
                width: `${gpaPercentage}%`,
              }}
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-bold">
              Enrolled Courses
            </h4>

            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500 dark:bg-slate-800">
              {courses.length}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {courses.map((course, index) => (
              <CourseTag
                key={`${id}-${course}`}
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

        <button
          type="button"
          onClick={() => {
            const confirmed = window.confirm(
              `Remove ${name} from the student list?`
            );

            if (confirmed) {
              removeStudent(id);
            }
          }}
          className="mt-6 w-full rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
        >
          Remove Student
        </button>
      </div>
    </article>
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
};

export default StudentCard;