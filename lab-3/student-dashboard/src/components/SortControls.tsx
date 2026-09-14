import {
  useStudents,
  type SortOption,
} from "../context/StudentContext";

function SortControls() {
  const { sortBy, setSortBy } = useStudents();

  const options: {
    value: SortOption;
    label: string;
  }[] = [
    {
      value: "default",
      label: "Default",
    },
    {
      value: "name",
      label: "Name A–Z",
    },
    {
      value: "gpa",
      label: "GPA High–Low",
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setSortBy(option.value)}
          className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
            sortBy === option.value
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default SortControls;