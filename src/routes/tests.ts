import express from "express";

import { coursesRepository } from "../repositories/courses-repository";

export const getTestsRoutes = () => {
  const router = express.Router();

  router.delete("/data", (req, res) => {
    coursesRepository.clearAllCourses();
    res.sendStatus(204);
  });

  return router;
};
