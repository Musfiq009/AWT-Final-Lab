
import PropTypes from "prop-types";

interface CourseTagProps {
  courseName: string;
  color: string;
}

const CourseTag = ({ courseName, color }: CourseTagProps) => {
  return (
    <span
      className="inline-flex items-center rounded-lg border px-3 py-1.5 text-xs font-semibold shadow-sm transition duration-200 hover:-translate-y-0.5"
      style={{
        backgroundColor: color,
        borderColor: `${color}99`,
        color: "#334155",
      }}
    >
      {courseName}
    </span>
  );
};

CourseTag.propTypes = {
  courseName: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default CourseTag;