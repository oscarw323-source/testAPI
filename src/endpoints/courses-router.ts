import { Router, Response } from "express";
import {
  RequestWithQuery,
  RequestWithParams,
  RequestWithBody,
  RequestWithParamsAndBody,
} from "../types";
import { CourseCreateModel } from "../models/CourseCreateModel";
import { CoursesViewModel } from "../models/CoursesViewModel";
import { CourseUpdateModel } from "../models/CourseUpdateModel";
import { GetCourseQueryModel } from "../models/GetCourseQueryModel";
import { URIParamsCoursesModel } from "../models/URIParamsCoursesModel";
import { CoursesType, DBType } from "../db";
import { HTTP_STATUSES } from "../routes/utils";
import { db } from "../db";

const getCourseViewModel = (dbCourse: CoursesType): CoursesViewModel => {
  return {
    id: dbCourse.id,
    title: dbCourse.title,
  };
};

export const router = Router({});
router.get(
  "/",
  (
    req: RequestWithQuery<GetCourseQueryModel>,
    res: Response<CoursesViewModel[]>,
  ) => {
    let foundCourses = db.courses;

    if (req.query.title) {
      foundCourses = foundCourses.filter(
        (c) => c.title.indexOf(req.query.title) > -1,
      );
    }

    res.json(foundCourses.map(getCourseViewModel));
  },
);
router.get(
  "/:id",
  (
    req: RequestWithParams<URIParamsCoursesModel>,
    res: Response<CoursesViewModel>,
  ) => {
    let foundCourse = db.courses.find((c) => c.id === +req.params.id);

    if (!foundCourse) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }

    res.json(getCourseViewModel(foundCourse));
  },
);
router.post(
  "/",
  (
    req: RequestWithBody<CourseCreateModel>,
    res: Response<CoursesViewModel>,
  ) => {
    if (!req.body.title) {
      res.sendStatus(400);
      return;
    }
    const createCourse: CoursesType = {
      id: +new Date(),
      title: req.body.title,
      studentsCount: 0,
    };
    db.courses.push(createCourse);
    res.status(HTTP_STATUSES.CREATE_201).json(getCourseViewModel(createCourse));
  },
);
router.delete("/:id", (req: RequestWithParams<URIParamsCoursesModel>, res) => {
  db.courses = db.courses.filter((c) => c.id !== +req.params.id);

  res.sendStatus(HTTP_STATUSES.NO_CONTET_204);
});
router.put(
  "/:id",
  (
    req: RequestWithParamsAndBody<URIParamsCoursesModel, CourseUpdateModel>,
    res,
  ) => {
    if (!req.body.title) {
      res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
      return;
    }
    let foundCourses = db.courses.find((c) => c.id === +req.params.id);

    if (!foundCourses) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }
    foundCourses.title = req.body.title;
    res.sendStatus(HTTP_STATUSES.NO_CONTET_204);
  },
);
