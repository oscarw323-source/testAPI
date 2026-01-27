import { CoursesType, DBType } from "../db";
import { CoursesViewModel } from "../models/CoursesViewModel";

let courses: CoursesType[] = [
  { id: 1, title: "front-end", studentsCount: 10 },
  { id: 2, title: "back-end", studentsCount: 10 },
  { id: 3, title: "automation", studentsCount: 10 },
  { id: 4, title: "devops", studentsCount: 10 },
];
const mapToViewModel = (dbCourse: CoursesType): CoursesViewModel => {
  return {
    id: dbCourse.id,
    title: dbCourse.title,
  };
};

export const coursesRepository = {
  findCourses(title: string | null | undefined): CoursesType[] {
    let filteredCourses = courses;

    if (title) {
      filteredCourses = filteredCourses.filter(
        (c) => c.title.indexOf(title) > -1,
      );
    }

    return filteredCourses;
  },

  getCoursesById(id: number) {
    const foundCourse = courses.find((p) => p.id === id);

    if (!foundCourse) {
      return null;
    }

    return mapToViewModel(foundCourse);
  },

  createdCourse(title: string): CoursesViewModel | null {
    if (!title) {
      return null;
    }

    const newCourse: CoursesType = {
      id: +new Date(),
      title: title,
      studentsCount: 0,
    };
    courses.push(newCourse);

    return mapToViewModel(newCourse);
  },

  updateCourse(id: number, title: string): boolean {
    if (!title) {
      return false;
    }

    const foundCourse = courses.find((c) => c.id === id);

    if (!foundCourse) {
      return false;
    }

    foundCourse.title = title;
    return true;
  },
  deleteCourse(id: number) {
    const initialLength = courses.length;

    courses = courses.filter((c) => c.id !== id);

    return courses.length < initialLength;
  },
  clearAllCourses(): void {
    courses.length = 0;
  },
};
