import { Router, Response } from "express";
import { RequestWithQuery, RequestWithParams } from "../types";
import { GetCourseQueryModel } from "../models/GetCourseQueryModel";
import { URIParamsCoursesModel } from "../models/URIParamsCoursesModel";

export const adressesRouts = Router();
adressesRouts.get(
  "/",
  (
    req: RequestWithQuery<GetCourseQueryModel>,
    res: Response<{ title: string }>,
  ) => {
    res.json({ title: "it/`s books handlers" });
  },
);
adressesRouts.get(
  "/:id",
  (
    req: RequestWithParams<URIParamsCoursesModel>,
    res: Response<{ title: string }>,
  ) => {
    if (!/^\d+$/.test(req.params.id)) {
      return res.sendStatus(404);
    }
    res.json({ title: "data by id" + req.params.id });
  },
);
