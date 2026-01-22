import express from "express";
import { db } from "./db";
import { getCoursesRoutes, getInterestingRoutes } from "./routes/courses";
import { HTTP_STATUSES } from "./routes/utils";
import { getTestsRoutes } from "./routes/tests";

export const app = express();
export { HTTP_STATUSES };

app.use(express.json());

app.use("/courses", getCoursesRoutes(app, db));
app.use("/__test__", getTestsRoutes(db));
app.use("/ineresting", getInterestingRoutes(app, db));
