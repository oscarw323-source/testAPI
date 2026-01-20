import express, { Request, Response } from "express";
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithQuery,
  RequestWithParamsAndBody,
} from "./types";
import { CourseCreateModel } from "./models/CourseCreateModel";
import { CourseUpdateModel } from "./models/CourseUpdateModel";
import { GetCourseQueryModel } from "./models/GetCourseQueryModel";
import { CoursesViewModel } from "./models/CoursesViewModel";
import { URIParamsCoursesModel } from "./models/URIParamsCoursesModel";

export const app = express();

type CoursesType = {
  id: number;
  title: string;
  studentsCount: number;
};

const port = 3000;

export const HTTP_STATUSES = {
  OK_200: 200,
  CREATE_201: 201,
  NO_CONTET_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,
};

const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware);

const db: { courses: CoursesType[] } = {
  courses: [
    { id: 1, title: "front-end", studentsCount: 10 },
    { id: 2, title: "back-end", studentsCount: 10 },
    { id: 3, title: "automation", studentsCount: 10 },
    { id: 4, title: "devops", studentsCount: 10 },
  ],
};

app.get(
  "/courses",
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

    res.json(
      foundCourses.map((dbCourse) => ({
        id: dbCourse.id,
        title: dbCourse.title,
      })),
    );
  },
);
app.get(
  "/courses/:id",
  (
    req: RequestWithParams<URIParamsCoursesModel>,
    res: Response<CoursesViewModel>,
  ) => {
    let foundCourse = db.courses.find((c) => c.id === +req.params.id);

    if (!foundCourse) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }

    res.json({
      id: foundCourse.id,
      title: foundCourse.title,
    });
  },
);
app.post(
  "/courses",
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
    res.status(HTTP_STATUSES.CREATE_201).json({
      id: createCourse.id,
      title: createCourse.title,
    });
  },
);
app.delete(
  "/courses/:id",
  (req: RequestWithParams<URIParamsCoursesModel>, res) => {
    db.courses = db.courses.filter((c) => c.id !== +req.params.id);

    res.sendStatus(HTTP_STATUSES.NO_CONTET_204);
  },
);

app.put(
  "/courses/:id",
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

app.delete("/__test__/data", (req, res) => {
  db.courses = [];
  res.sendStatus(204);
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}
