import express from "express";

import { DBType } from "../db";

export const getTestsRoutes = (db: DBType) => {
  const router = express.Router();
  router.delete("/data", (req, res) => {
    db.courses = [];
    res.sendStatus(204);
  });

  return router;
};
