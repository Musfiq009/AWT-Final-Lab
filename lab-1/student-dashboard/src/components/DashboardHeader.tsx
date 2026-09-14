import PropTypes from "prop-types";

interface DashboardHeaderProps {
  favoriteCount?: number;
}

const DashboardHeader = ({
  favoriteCount = 0,
}: DashboardHeaderProps) => {
  return (
    <header className="dashboard-header">
      <div>
        <h1>Student Dashboard</h1>

        <p>
          Manage and monitor student academic
          information
        </p>
      </div>

      <div className="header-right">
        <span className="favorite-count">
          ★ Favorites: {favoriteCount}
        </span>
      </div>

      <nav>
        <a href="#home">Home</a>
        <a href="#students">Students</a>
        <a href="#courses">Courses</a>
        <a href="#about">About</a>
      </nav>
    </header>
  );
};

DashboardHeader.propTypes = {
  favoriteCount: PropTypes.number,
};

export default DashboardHeader;