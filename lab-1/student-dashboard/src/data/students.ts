import type { Student } from "../types/student";
import girlImg from "../../public/images-girl-avatar.jpg"
import girlImg2 from "../../public/images-girl-avatar2.jpg"
import boyImg from "../../public/image-boy-avatar.jpg"
import boyImg2 from "../../public/images-boy-avatar2.jpg"


export const studentData: Student[] = [
  {
    name: "Musfiq Rahat",
    id: "1",
    avatar: boyImg,
    gpa: 3.55,
    major: "Computer Science",
    courses: ["React", "Database", "Algorithms"],
  },
  {
    name: "Anika Tasnim",
    id: "2",
    avatar: girlImg2,
    gpa: 3.32,
    major: "Software Engineering",
    courses: ["JavaScript", "React", "Web Technology"],
  },
  {
    name: "Meherab Khan",
    id: "3",
    avatar: boyImg2,
    gpa: 3.88,
    major: "Computer Science",
    courses: ["Python", "AI", "Machine Learning"],
  },
  {
    name: "Raisha Tabassum",
    id: "4",
    avatar: girlImg,
    gpa: 3.34,
    major: "Information Technology",
    courses: ["Networking", "Database", "Security"],
  },
];