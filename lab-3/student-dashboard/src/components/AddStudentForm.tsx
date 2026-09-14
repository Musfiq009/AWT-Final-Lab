import { useEffect, useState } from "react";

import { useStudents } from "../context/StudentContext";
import { useTheme } from "../context/ThemeContext";

interface FormData {
  name: string;
  id: string;
  major: string;
  gpa: string;
  courses: string;
}

interface FormErrors {
  name?: string;
  id?: string;
  major?: string;
  gpa?: string;
  courses?: string;
}

function AddStudentForm() {
  const { students, addStudent } = useStudents();
  const { theme } = useTheme();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    id: "",
    major: "",
    gpa: "",
    courses: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);

  /*
   * Automatically hide success notification
   * after 3 seconds.
   */
  useEffect(() => {
    if (!success) {
      return;
    }

    const timer = setTimeout(() => {
      setSuccess(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [success]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
    }));
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required.";
    }

    if (!formData.id.trim()) {
      newErrors.id = "Student ID is required.";
    } else if (!/^\d+$/.test(formData.id)) {
      newErrors.id =
        "Student ID must contain numbers only.";
    } else if (
      students.some(
        (student) => student.id === formData.id.trim()
      )
    ) {
      newErrors.id = "Student ID must be unique.";
    }

    if (!formData.major.trim()) {
      newErrors.major = "Major is required.";
    }

    if (!formData.gpa.trim()) {
      newErrors.gpa = "GPA is required.";
    } else {
      const gpa = Number(formData.gpa);

      if (Number.isNaN(gpa) || gpa < 0 || gpa > 4) {
        newErrors.gpa =
          "GPA must be between 0 and 4.0.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const newStudent = {
      name: formData.name.trim(),
      id: formData.id.trim(),
      major: formData.major.trim(),
      gpa: Number(formData.gpa),
      courses: formData.courses
        .split(",")
        .map((course) => course.trim())
        .filter((course) => course.length > 0),
      avatar: "/image-boy-avatar.jpg",
    };

    addStudent(newStudent);

    setFormData({
      name: "",
      id: "",
      major: "",
      gpa: "",
      courses: "",
    });

    setErrors({});
    setSuccess(true);
  };

  const inputClass =
    theme === "dark"
      ? "border-slate-700 bg-slate-900 text-white placeholder-slate-500"
      : "border-slate-300 bg-white text-slate-900 placeholder-slate-400";

  return (
    <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5">
        <h2 className="text-xl font-bold">
          Add New Student
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Register a new student in the dashboard.
        </p>
      </div>

      {success && (
        <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300">
          Student added successfully!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-5 md:grid-cols-2"
      >
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500 ${inputClass}`}
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Student ID
          </label>

          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="Enter numeric ID"
            className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500 ${inputClass}`}
          />

          {errors.id && (
            <p className="mt-1 text-sm text-red-500">
              {errors.id}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Major
          </label>

          <input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleChange}
            placeholder="Enter major"
            className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500 ${inputClass}`}
          />

          {errors.major && (
            <p className="mt-1 text-sm text-red-500">
              {errors.major}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            GPA
          </label>

          <input
            type="number"
            name="gpa"
            value={formData.gpa}
            onChange={handleChange}
            min="0"
            max="4"
            step="0.01"
            placeholder="0.00 - 4.00"
            className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500 ${inputClass}`}
          />

          {errors.gpa && (
            <p className="mt-1 text-sm text-red-500">
              {errors.gpa}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold">
            Courses
          </label>

          <input
            type="text"
            name="courses"
            value={formData.courses}
            onChange={handleChange}
            placeholder="React, Database, Algorithms"
            className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500 ${inputClass}`}
          />

          <p className="mt-1 text-xs text-slate-500">
            Separate courses using commas.
          </p>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Add Student
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddStudentForm;