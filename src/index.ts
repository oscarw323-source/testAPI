import { app, HTTP_STATUSES } from "./app";
import { NextFunction, Request, Response } from "express";
export { app, HTTP_STATUSES };
import bodyParser from "body-parser";
// import { runDb } from "./repositories/courses-repository"; // Реэкспорт из repositories/courses-repository.ts
import { runDb } from "./repositories/courses-in-memory-repository";
// import { runDb } from "./repositories/courses-in-memory-repository"; // Реэкспорт из courses-in-memory-repository.ts

const port = 3000;

app.use(bodyParser.json());

app.get("/indexCourse", (req: Request, res: Response) => {
  res.send({ value: "it works!" });
});

const startApp = async () => {
  await runDb();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};
startApp();
