import { useStudents } from "../context/StudentContext";

const SortControls = () => {
  const {
    sortBy,
    setSortBy,
  } = useStudents();

  return (
    <div className="sort-controls">
      <button
        className={
          sortBy === "default"
            ? "active"
            : ""
        }
        onClick={() =>
          setSortBy("default")
        }
      >
        Default
      </button>

      <button
        className={
          sortBy === "name"
            ? "active"
            : ""
        }
        onClick={() =>
          setSortBy("name")
        }
      >
        Name A-Z
      </button>

      <button
        className={
          sortBy === "gpa"
            ? "active"
            : ""
        }
        onClick={() =>
          setSortBy("gpa")
        }
      >
        GPA High-Low
      </button>
    </div>
  );
};

export default SortControls;