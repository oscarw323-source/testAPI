import express from "express";

import { router as coursesRouter } from "./endpoints/courses-router";
import { adressesRouts } from "./endpoints/adresses-router";
import { HTTP_STATUSES } from "./routes/utils";
import { getTestsRoutes } from "./routes/tests";

export const app = express();
export { HTTP_STATUSES };

app.use(express.json());

app.use("/courses", coursesRouter);
app.use("/addresses", adressesRouts);
app.use("/__test__", getTestsRoutes());
