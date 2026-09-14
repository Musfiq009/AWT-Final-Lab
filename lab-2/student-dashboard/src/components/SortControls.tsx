import PropTypes from "prop-types";

export type SortOption =
  | "default"
  | "name"
  | "gpa";

interface SortControlsProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SortControls = ({
  sortBy,
  onSortChange,
}: SortControlsProps) => {
  return (
    <div className="sort-controls">
      <button
        className={
          sortBy === "default"
            ? "active"
            : ""
        }
        onClick={() => onSortChange("default")}
      >
        Default
      </button>

      <button
        className={
          sortBy === "name"
            ? "active"
            : ""
        }
        onClick={() => onSortChange("name")}
      >
        Name A-Z
      </button>

      <button
        className={
          sortBy === "gpa"
            ? "active"
            : ""
        }
        onClick={() => onSortChange("gpa")}
      >
        GPA High-Low
      </button>
    </div>
  );
};

SortControls.propTypes = {
  sortBy: PropTypes.oneOf([
    "default",
    "name",
    "gpa",
  ]).isRequired,

  onSortChange:
    PropTypes.func.isRequired,
};

export default SortControls;