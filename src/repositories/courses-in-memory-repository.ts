import { CoursesType, DBType } from "../db";
import { CoursesViewModel } from "../models/CoursesViewModel";
import { coursesCollection } from "../routes/mongoDB";

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

export const runDb = async () => {
  console.log("In-memory database initialized");
  const count = await coursesCollection.countDocuments();
  if (count === 0) await coursesCollection.insertMany(courses);
};

export const coursesRepository = {
  async findCourses(title: string | null | undefined): Promise<CoursesType[]> {
    const filter: any = {};

    if (title) {
      filter.title = { $regex: title };
    }
    return coursesCollection.find(filter).toArray();
  },

  async getCoursesById(id: number) {
    const foundCourse: CoursesType | null = await coursesCollection.findOne({
      id: id,
    });

    return foundCourse;
  },

  async createdCourse(
    newCourse: CoursesType,
  ): Promise<CoursesViewModel | null> {
    const result = await coursesCollection.insertOne(newCourse);

    return mapToViewModel(newCourse);
  },

  async updateCourse(id: number, title: string): Promise<boolean> {
    const result = await coursesCollection.updateOne(
      { id: id },
      { $set: { title: title } },
    );
    return result.matchedCount === 1;
  },
  async deleteCourse(id: number): Promise<boolean> {
    const result = await coursesCollection.deleteOne({ id: id });
    return result.deletedCount === 1;
  },
};
