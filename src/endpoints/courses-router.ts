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
import { body, validationResult } from "express-validator";
import { inputValidationMiddleware } from "../validation/input-validation-middleware";

const getCourseViewModel = (dbCourse: CoursesType): CoursesViewModel => {
  return {
    id: dbCourse.id,
    title: dbCourse.title,
  };
};

export const router = Router({});

const titleValidation = body("title")
  .isLength({ min: 4, max: 20 })
  .withMessage("Title length should be 4-20 symbols");

router.post(
  "/",
  titleValidation,
  inputValidationMiddleware,
  (req: RequestWithBody<CourseCreateModel>, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HTTP_STATUSES.BAD_REQUEST_400)
        .json({ errors: errors.array() });
    }

    const createdCourse = coursesRepository.createdCourse(req.body.title);
    return res.status(HTTP_STATUSES.CREATE_201).json(createdCourse);
  },
);

router.put(
  "/:id",
  titleValidation,
  inputValidationMiddleware,
  (
    req: RequestWithParamsAndBody<URIParamsCoursesModel, CourseUpdateModel>,
    res,
  ) => {
    const updated = coursesRepository.updateCourse(
      +req.params.id,
      req.body.title,
    );

    if (!updated) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTET_204);
  },
);

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

router.delete("/:id", (req: RequestWithParams<URIParamsCoursesModel>, res) => {
  const deleted = coursesRepository.deleteCourse(+req.params.id);

  if (!deleted) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  res.sendStatus(HTTP_STATUSES.NO_CONTET_204);
});
