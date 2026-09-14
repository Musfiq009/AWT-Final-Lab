import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Student } from "../types/student";

import {
  studentData,
} from "../data/students";

import {
  SortOption,
} from "../components/SortControls";

interface StudentContextType {
  students: Student[];
  query: string;
  sortBy: SortOption;
  favorites: string[];

  setQuery: (
    query: string
  ) => void;

  setSortBy: (
    sort: SortOption
  ) => void;

  addStudent: (
    student: Student
  ) => void;

  removeStudent: (
    id: string
  ) => void;

  toggleFavorite: (
    id: string
  ) => void;
}

const StudentContext =
  createContext<
    StudentContextType | undefined
  >(undefined);

interface StudentProviderProps {
  children: ReactNode;
}

export const StudentProvider = ({
  children,
}: StudentProviderProps) => {
  const [students, setStudents] =
    useState<Student[]>(() => {
      const saved =
        localStorage.getItem(
          "students"
        );

      if (saved) {
        try {
          return JSON.parse(
            saved
          );
        } catch {
          return studentData;
        }
      }

      return studentData;
    });

  const [query, setQuery] =
    useState("");

  const [sortBy, setSortBy] =
    useState<SortOption>(
      "default"
    );

  const [favorites, setFavorites] =
    useState<string[]>([]);

  /*
   * Save students to localStorage
   */
  useEffect(() => {
    localStorage.setItem(
      "students",
      JSON.stringify(students)
    );
  }, [students]);

  /*
   * Add student
   */
  const addStudent = (
    student: Student
  ) => {
    setStudents((previous) => [
      ...previous,
      student,
    ]);
  };

  /*
   * Remove student
   */
  const removeStudent = (
    id: string
  ) => {
    setStudents((previous) =>
      previous.filter(
        (student) =>
          student.id !== id
      )
    );

    setFavorites((previous) =>
      previous.filter(
        (favoriteId) =>
          favoriteId !== id
      )
    );
  };

  /*
   * Toggle favorite
   */
  const toggleFavorite = (
    id: string
  ) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter(
            (favoriteId) =>
              favoriteId !== id
          )
        : [...previous, id]
    );
  };

  /*
   * Search + sorting
   */
  const filteredStudents =
    useMemo(() => {
      const search =
        query.toLowerCase();

      const filtered =
        students.filter(
          (student) =>
            student.name
              .toLowerCase()
              .includes(search) ||
            student.major
              .toLowerCase()
              .includes(search)
        );

      if (sortBy === "name") {
        return [...filtered].sort(
          (a, b) =>
            a.name.localeCompare(
              b.name
            )
        );
      }

      if (sortBy === "gpa") {
        return [...filtered].sort(
          (a, b) =>
            b.gpa - a.gpa
        );
      }

      return filtered;
    }, [
      students,
      query,
      sortBy,
    ]);

  return (
    <StudentContext.Provider
      value={{
        students: filteredStudents,
        query,
        sortBy,
        favorites,
        setQuery,
        setSortBy,
        addStudent,
        removeStudent,
        toggleFavorite,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => {
  const context =
    useContext(StudentContext);

  if (!context) {
    throw new Error(
      "useStudents must be used inside StudentProvider"
    );
  }

  return context;
};