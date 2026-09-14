
import PropTypes from "prop-types";

interface DashboardHeaderProps {
  favoriteCount?: number;
}

const DashboardHeader = ({
  favoriteCount = 0,
}: DashboardHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex min-h-20 w-[92%] max-w-7xl flex-col justify-center gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Logo / Title */}
        <div>
          <a
            href="#home"
            className="text-xl font-bold tracking-tight text-slate-900 transition hover:text-blue-600 sm:text-2xl"
          >
            Student<span className="text-blue-600">Dashboard</span>
          </a>

          <p className="mt-0.5 hidden text-xs text-slate-500 sm:block">
            Manage and monitor student academic information
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-between gap-4">
          <nav className="flex items-center gap-1 overflow-x-auto rounded-xl bg-slate-100 p-1">
            <a
              href="#home"
              className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-blue-600 hover:shadow-sm"
            >
              Home
            </a>

            <a
              href="#students"
              className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-blue-600 hover:shadow-sm"
            >
              Students
            </a>

            <a
              href="#courses"
              className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-blue-600 hover:shadow-sm"
            >
              Courses
            </a>

            <a
              href="#about"
              className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-blue-600 hover:shadow-sm"
            >
              About
            </a>
          </nav>

          <div className="hidden items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700 md:flex">
            <span className="text-base">★</span>
            <span>Favorites: {favoriteCount}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

DashboardHeader.propTypes = {
  favoriteCount: PropTypes.number,
};

export default DashboardHeader;