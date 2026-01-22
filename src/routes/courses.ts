import express, { Express, Response } from "express";

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
import { HTTP_STATUSES } from "./utils";
import { Router } from "express";
import { title } from "node:process";

export const getCoursesRoutes = (app: Express, db: DBType) => {
  const router = express.Router();
  return router;
};

export const getInterestingRoutes = (app: Express, db: DBType) => {
  const router = express.Router();
  return router;
};
