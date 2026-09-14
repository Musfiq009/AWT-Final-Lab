
import PropTypes from "prop-types";

interface StatBadgeProps {
  label: string;
  value: string | number;
}

const StatBadge = ({ label, value }: StatBadgeProps) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-blue-50 transition duration-300 group-hover:scale-150" />

      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-500">
            {label}
          </span>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            {label === "Total Students" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 3v18" />
                <path d="M17 8.5A4.5 4.5 0 0 0 12.5 5H11a4 4 0 0 0 0 8h2a4 4 0 0 1 0 8h-1.5A4.5 4.5 0 0 1 7 16.5" />
              </svg>
            )}
          </div>
        </div>

        <strong className="text-3xl font-bold tracking-tight text-slate-900">
          {value}
        </strong>
      </div>
    </div>
  );
};

StatBadge.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default StatBadge;