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
import { CoursesType } from "../db";
import { HTTP_STATUSES } from "../routes/utils";
import { coursesRepository } from "../repositories/courses-repository";

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
    let foundCourses = coursesRepository.findCourses(
      req.query.title?.toString(),
    );
    res.json(foundCourses.map(getCourseViewModel));
  },
);

router.get(
  "/:id",
  (
    req: RequestWithParams<URIParamsCoursesModel>,
    res: Response<CoursesViewModel>,
  ) => {
    let foundCourse = coursesRepository.getCoursesById(+req.params.id);

    if (!foundCourse) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }

    res.json(foundCourse);
  },
);

router.post(
  "/",
  (
    req: RequestWithBody<CourseCreateModel>,
    res: Response<CoursesViewModel>,
  ) => {
    const createdCourse = coursesRepository.createdCourse(req.body.title);

    if (!createdCourse) {
      res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
      return;
    }

    res.status(HTTP_STATUSES.CREATE_201).json(createdCourse);
  },
);

router.delete("/:id", (req: RequestWithParams<URIParamsCoursesModel>, res) => {
  const deleted = coursesRepository.deleteCourse(+req.params.id);

  if (!deleted) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  res.sendStatus(HTTP_STATUSES.NO_CONTET_204);
});

router.put("/:id", (req, res) => {
  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  const updated = coursesRepository.updateCourse(
    +req.params.id,
    req.body.title,
  );

  if (!updated) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  res.sendStatus(HTTP_STATUSES.NO_CONTET_204);
});
