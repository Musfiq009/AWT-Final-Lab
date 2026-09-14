import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import { useStudents } from "../context/StudentContext";

interface FormErrors {
  name?: string;
  id?: string;
  major?: string;
  gpa?: string;
  courses?: string;
}

const AddStudentForm = () => {
  const {
    students,
    addStudent,
  } = useStudents();

  const [name, setName] =
    useState("");

  const [id, setId] =
    useState("");

  const [major, setMajor] =
    useState("");

  const [gpa, setGpa] =
    useState("");

  const [courses, setCourses] =
    useState("");

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [success, setSuccess] =
    useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors =
      {};

    /*
     * Name validation
     */
    if (!name.trim()) {
      newErrors.name =
        "Full name is required.";
    }

    /*
     * ID validation
     */
    if (!id.trim()) {
      newErrors.id =
        "Student ID is required.";
    } else if (!/^\d+$/.test(id)) {
      newErrors.id =
        "Student ID must be numeric.";
    } else if (
      students.some(
        (student) =>
          student.id === id
      )
    ) {
      newErrors.id =
        "Student ID already exists.";
    }

    /*
     * Major validation
     */
    if (!major.trim()) {
      newErrors.major =
        "Major is required.";
    }

    /*
     * GPA validation
     */
    const numericGpa =
      Number(gpa);

    if (!gpa.trim()) {
      newErrors.gpa =
        "GPA is required.";
    } else if (
      Number.isNaN(numericGpa)
    ) {
      newErrors.gpa =
        "GPA must be a number.";
    } else if (
      numericGpa < 0 ||
      numericGpa > 4
    ) {
      newErrors.gpa =
        "GPA must be between 0 and 4.0.";
    }

    /*
     * Courses validation
     */
    if (!courses.trim()) {
      newErrors.courses =
        "At least one course is required.";
    }

    setErrors(newErrors);

    return (
      Object.keys(
        newErrors
      ).length === 0
    );
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const newStudent = {
      name: name.trim(),
      id: id.trim(),
      avatar:
        `https://i.pravatar.cc/150?u=${id}`,
      gpa: Number(gpa),
      major: major.trim(),
      courses: courses
        .split(",")
        .map(
          (course) =>
            course.trim()
        )
        .filter(Boolean),
    };

    addStudent(newStudent);

    setName("");
    setId("");
    setMajor("");
    setGpa("");
    setCourses("");
    setErrors({});
    setSuccess(true);
  };

  /*
   * Automatically hide
   * success message
   * after 3 seconds
   */
  useEffect(() => {
    if (!success) {
      return;
    }

    const timer =
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [success]);

  return (
    <section
      id="add-student"
      className="form-section"
    >
      <div className="section-heading">
        <h2>
          Add New Student
        </h2>

        <p>
          Register a new student
          in the dashboard
        </p>
      </div>

      {success && (
        <div className="success-message">
          ✓ Student added
          successfully!
        </div>
      )}

      <form
        className="student-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label>
            Full Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(event) =>
              setName(
                event.target.value
              )
            }
          />

          {errors.name && (
            <span className="error">
              {errors.name}
            </span>
          )}
        </div>

        <div className="form-group">
          <label>
            Student ID
          </label>

          <input
            type="text"
            value={id}
            onChange={(event) =>
              setId(
                event.target.value
              )
            }
          />

          {errors.id && (
            <span className="error">
              {errors.id}
            </span>
          )}
        </div>

        <div className="form-group">
          <label>
            Major
          </label>

          <input
            type="text"
            value={major}
            onChange={(event) =>
              setMajor(
                event.target.value
              )
            }
          />

          {errors.major && (
            <span className="error">
              {errors.major}
            </span>
          )}
        </div>

        <div className="form-group">
          <label>
            GPA
          </label>

          <input
            type="number"
            step="0.01"
            min="0"
            max="4"
            value={gpa}
            onChange={(event) =>
              setGpa(
                event.target.value
              )
            }
          />

          {errors.gpa && (
            <span className="error">
              {errors.gpa}
            </span>
          )}
        </div>

        <div className="form-group">
          <label>
            Courses
          </label>

          <input
            type="text"
            placeholder="React, Database, Algorithms"
            value={courses}
            onChange={(event) =>
              setCourses(
                event.target.value
              )
            }
          />

          {errors.courses && (
            <span className="error">
              {errors.courses}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="submit-button"
        >
          Add Student
        </button>
      </form>
    </section>
  );
};

export default AddStudentForm;