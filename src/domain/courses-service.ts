import { CoursesViewModel } from "../models/CoursesViewModel";
import { coursesCollection } from "../routes/mongoDB";
import { CoursesType } from "../db";
import { coursesRepository } from "../repositories/courses-in-memory-repository";

const mapToViewModel = (dbCourse: CoursesType): CoursesViewModel => {
  return {
    id: dbCourse.id,
    title: dbCourse.title,
  };
};

export const runDb = async () => {
  console.log("MongoDB database initialized");
};

export const coursesService = {
  async findCourses(title: string | null | undefined): Promise<CoursesType[]> {
    return coursesRepository.findCourses(title);
  },

  async getCoursesById(id: number): Promise<CoursesViewModel | null> {
    const foundCourse: CoursesType | null = await coursesCollection.findOne({
      id: id,
    });

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
    const createdCourse = await coursesCollection.insertOne(newCourse);

    return mapToViewModel(newCourse);
  },

  async updateCourse(id: number, title: string): Promise<boolean> {
    return await coursesRepository.updateCourse(id, title);
  },

  async deleteCourse(id: number): Promise<boolean> {
    return await coursesRepository.deleteCourse(id);
  },

  async findOne(filter: { id: number }): Promise<CoursesType | null> {
    const course = await coursesRepository.getCoursesById(filter.id);
    if (!course) return null;
    return { id: course.id, title: course.title, studentsCount: 0 };
  },
  async insertOne(course: CoursesType): Promise<any> {
    return coursesRepository.createdCourse(course);
  },

  async updateOne(
    filter: { id: number },
    update: { $set: { title: string } },
  ): Promise<{ matchedCount: number }> {
    const result = await coursesRepository.updateCourse(
      filter.id,
      update.$set.title,
    );
    return { matchedCount: result ? 1 : 0 };
  },

  async deleteOne(filter: { id: number }): Promise<{ deletedCount: number }> {
    const result = await coursesRepository.deleteCourse(filter.id);
    return { deletedCount: result ? 1 : 0 };
  },
};
