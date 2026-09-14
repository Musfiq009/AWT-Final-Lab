
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
}

const StudentCard = ({
  name,
  id,
  avatar,
  gpa,
  major,
  courses,
}: StudentCardProps) => {
  const gpaPercentage = Math.min((gpa / 4) * 100, 100);

  const getGpaStyle = () => {
    if (gpa >= 3.75) {
      return {
        badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
        bar: "bg-emerald-500",
      };
    }

    if (gpa >= 3.5) {
      return {
        badge: "bg-blue-50 text-blue-700 border-blue-200",
        bar: "bg-blue-500",
      };
    }

    return {
      badge: "bg-amber-50 text-amber-700 border-amber-200",
      bar: "bg-amber-500",
    };
  };

  const gpaStyle = getGpaStyle();

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
      {/* Top Gradient */}
      <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

      <div className="p-5 sm:p-6">
        {/* Student Header */}
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <img
              src={avatar}
              alt={`${name}'s avatar`}
              className="h-16 w-16 rounded-2xl border-2 border-white object-cover shadow-md ring-2 ring-slate-100 transition duration-300 group-hover:ring-blue-100 sm:h-[72px] sm:w-[72px]"
            />

            <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-bold text-slate-900">
              {name}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Student ID:{" "}
              <span className="font-medium text-slate-700">
                {id}
              </span>
            </p>
          </div>
        </div>

        {/* Major */}
        <div className="mt-6 rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Major
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-800">
            {major}
          </p>
        </div>

        {/* GPA */}
        <div className="mt-5 rounded-xl border border-slate-100 bg-white">
          <div className="flex items-center justify-between">
            <StatBadge
              label="GPA"
              value={gpa.toFixed(2)}
            />

            <span
              className={`mr-3 rounded-lg border px-2.5 py-1 text-xs font-bold ${gpaStyle.badge}`}
            >
              {gpa >= 3.75
                ? "Excellent"
                : gpa >= 3.5
                  ? "Very Good"
                  : "Good"}
            </span>
          </div>

          <div className="px-4 pb-4">
            <div className="mb-1 flex justify-between text-xs text-slate-400">
              <span>GPA Progress</span>
              <span>4.00</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full transition-all duration-700 ${gpaStyle.bar}`}
                style={{ width: `${gpaPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Courses */}
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-800">
              Enrolled Courses
            </h4>

            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
              {courses.length}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
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