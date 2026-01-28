import express, { NextFunction, Request, Response } from "express";

import { router as coursesRouter } from "./endpoints/courses-router";
import { adressesRouts } from "./endpoints/adresses-router";
import { HTTP_STATUSES } from "./routes/utils";
import { getTestsRoutes } from "./routes/tests";

export const app = express();
export { HTTP_STATUSES };

app.use(express.json());

const authGuardMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.query.token === "123") {
    next();
  } else {
    res.sendStatus(401);
  }
};

let requestCouter = 0;
const requestCoutnerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  requestCouter++;
  next();
};

const blablaMiddleware = (req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  req.blablaMiddleware = "hello";
  next();
};

app.use(requestCoutnerMiddleware);
app.use(blablaMiddleware);
// app.use(authGuardMiddleware); // для проверки тестов на валидность

app.get(
  "/indexCourse",

  (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    req.blablaMiddleware = "hello";
    next();
  },
  (req: Request, res: Response) => {
    //@ts-ignore
    const blablaMiddleware = req.blablaMiddleware;
    res.send({ value: blablaMiddleware + "!!!!" + requestCouter });
  },
);
app.get(
  "/indexUser",

  (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    req.blablaMiddleware = "hello";
    next();
  },
  (req: Request, res: Response) => {
    //@ts-ignore
    const blablaMiddleware = req.blablaMiddleware;
    res.send({ value: blablaMiddleware + "from users!!!!" + requestCouter });
  },
);

app.use("/courses", coursesRouter);
app.use("/addresses", adressesRouts);
app.use("/__test__", getTestsRoutes());
