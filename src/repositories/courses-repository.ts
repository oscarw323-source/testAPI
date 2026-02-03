import { CoursesType, DBType } from "../db";
import { CoursesViewModel } from "../models/CoursesViewModel";

let courses: CoursesType[] = [];
export const mapToViewModel = (dbCourse: CoursesType): CoursesViewModel => {
  return {
    id: dbCourse.id,
    title: dbCourse.title,
  };
};

export const runDb = async () => {
  console.log("In-memory database initialized");
};

export const coursesRepository = {
  async findCourses(title: string | null | undefined): Promise<CoursesType[]> {
    let filteredCourses = courses;

    if (title) {
      filteredCourses = filteredCourses.filter(
        (c) => c.title.indexOf(title) > -1,
      );
      return filteredCourses;
    } else {
      return courses;
    }
  },

  getCoursesById(id: number) {
    const foundCourse = courses.find((p) => p.id === id);

    if (!foundCourse) {
      return null;
    }

    return mapToViewModel(foundCourse);
  },

  async createdCourse(title: string): Promise<CoursesViewModel | null> {
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

  async updateCourse(id: number, title: string): Promise<boolean> {
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
  async deleteCourse(id: number): Promise<boolean> {
    const initialLength = courses.length;

    courses = courses.filter((c) => c.id !== id);

    return courses.length < initialLength;
  },
  clearAllCourses(): void {
    courses.length = 0;
  },
};
