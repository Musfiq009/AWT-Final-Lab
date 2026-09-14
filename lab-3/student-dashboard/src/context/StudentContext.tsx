import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { studentData } from "../data/students";
import type { Student } from "../types/student";

export type SortOption = "default" | "name" | "gpa";

interface StudentContextType {
  students: Student[];
  displayedStudents: Student[];
  query: string;
  sortBy: SortOption;
  favorites: string[];
  loading: boolean;
  setQuery: (query: string) => void;
  setSortBy: (sort: SortOption) => void;
  toggleFavorite: (id: string) => void;
  removeStudent: (id: string) => void;
  addStudent: (student: Student) => void;
}

const StudentContext = createContext<
  StudentContextType | undefined
>(undefined);

interface StudentProviderProps {
  children: ReactNode;
}

export function StudentProvider({
  children,
}: StudentProviderProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] =
    useState<SortOption>("default");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);


  useEffect(() => {
    const savedStudents =
      localStorage.getItem("student-dashboard-students");

    if (savedStudents) {
      try {
        const parsedStudents: Student[] =
          JSON.parse(savedStudents);

        setStudents(parsedStudents);
      } catch {
        setStudents(studentData);
      }
    } else {
      setStudents(studentData);
    }

    setLoading(false);
    setHydrated(true);
  }, []);

  /*
   * Persist student list whenever it changes.
   */
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(
        "student-dashboard-students",
        JSON.stringify(students)
      );
    }
  }, [students, hydrated]);

  /*
   * Search + sorting.
   */
  const displayedStudents = useMemo(() => {
    const search = query.toLowerCase().trim();

    const filtered = students.filter((student) => {
      return (
        student.name.toLowerCase().includes(search) ||
        student.major.toLowerCase().includes(search)
      );
    });

    const sorted = [...filtered];

    if (sortBy === "name") {
      sorted.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    if (sortBy === "gpa") {
      sorted.sort((a, b) => b.gpa - a.gpa);
    }

    return sorted;
  }, [students, query, sortBy]);

  /*
   * Add a new student.
   */
  const addStudent = (student: Student) => {
    setStudents((previousStudents) => [
      ...previousStudents,
      student,
    ]);
  };

  /*
   * Remove a student.
   */
  const removeStudent = (id: string) => {
    setStudents((previousStudents) =>
      previousStudents.filter(
        (student) => student.id !== id
      )
    );

    setFavorites((previousFavorites) =>
      previousFavorites.filter(
        (favoriteId) => favoriteId !== id
      )
    );
  };

  /*
   * Favorite toggle.
   */
  const toggleFavorite = (id: string) => {
    setFavorites((previousFavorites) => {
      if (previousFavorites.includes(id)) {
        return previousFavorites.filter(
          (favoriteId) => favoriteId !== id
        );
      }

      return [...previousFavorites, id];
    });
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        displayedStudents,
        query,
        sortBy,
        favorites,
        loading,
        setQuery,
        setSortBy,
        toggleFavorite,
        removeStudent,
        addStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudents() {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error(
      "useStudents must be used inside StudentProvider"
    );
  }

  return context;
}