import { app, HTTP_STATUSES } from "./app";
import { NextFunction, Request, Response } from "express";
export { app, HTTP_STATUSES };
import bodyParser from "body-parser";

const port = 3000;

app.use(bodyParser.json());

app.get("/indexCourse", (req: Request, res: Response) => {
  res.send({ value: "it works!" });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}
