import PropTypes from "prop-types";

interface StatBadgeProps {
  label: string;
  value: string | number;
}

const StatBadge = ({ label, value }: StatBadgeProps) => {
  return (
    <div className="stat-badge">
      <span className="stat-label">{label}</span>
      <strong className="stat-value">{value}</strong>
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