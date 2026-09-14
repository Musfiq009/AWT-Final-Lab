import PropTypes from "prop-types";

interface CourseTagProps {
  courseName: string;
  color: string;
}

const CourseTag = ({ courseName, color }: CourseTagProps) => {
  return (
    <span
      className="course-tag"
      style={{
        backgroundColor: color,
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