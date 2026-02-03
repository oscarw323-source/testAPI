import { Router } from "express";
import { CoursesType } from "../db";
import { CoursesViewModel } from "../models/CoursesViewModel";
import { coursesService } from "../domain/courses-service";

export const router = Router({});

router.get("/", async (req, res) => {
  const courses = await coursesService.findCourses(req.query.title?.toString());
  res.json(courses);
});

router.get("/:id", async (req, res) => {
  const course = await coursesService.getCoursesById(+req.params.id);
  if (!course) {
    res.sendStatus(404);
    return;
  }
  res.json(course);
});

router.post("/", async (req, res) => {
  const created = await coursesService.createdCourse(req.body.title);
  if (!created) {
    res.sendStatus(400);
    return;
  }
  res.status(201).json(created);
});

router.put("/:id", async (req, res) => {
  const updated = await coursesService.updateCourse(
    +req.params.id,
    req.body.title,
  );
  if (!updated) {
    res.sendStatus(404);
    return;
  }
  res.sendStatus(204);
});

router.delete("/:id", async (req, res) => {
  const deleted = await coursesService.deleteCourse(+req.params.id);
  if (!deleted) {
    res.sendStatus(404);
    return;
  }
  res.sendStatus(204);
});

const mapToViewModel = (dbCourse: CoursesType): CoursesViewModel => {
  return {
    id: dbCourse.id,
    title: dbCourse.title,
  };
};

export const coursesRepository = {
  async getCoursesById(id: number): Promise<CoursesViewModel | null> {
    const foundCourse: CoursesType | null = await coursesService.findOne({
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
    const result = await coursesService.insertOne(newCourse);

    return mapToViewModel(newCourse);
  },

  async updateCourse(id: number, title: string): Promise<boolean> {
    const result = await coursesService.updateOne(
      { id: id },
      { $set: { title: title } },
    );
    return result.matchedCount === 1;
  },

  async deleteCourse(id: number): Promise<boolean> {
    const result = await coursesService.deleteOne({ id: id });
    return result.deletedCount === 1;
  },
};
