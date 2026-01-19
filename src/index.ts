import express from "express";

export const app = express();

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

const db = {
  courses: [
    { id: 1, title: "front-end" },
    { id: 2, title: "back-end" },
    { id: 3, title: "automation" },
    { id: 4, title: "devops" },
  ],
};

app.get("/courses", (req, res) => {
  let foundCourses = db.courses;

  if (req.query.title) {
    foundCourses = foundCourses.filter(
      (c) => c.title.indexOf(req.query.title as string) > -1,
    );
  }

  res.json(foundCourses);
});
app.get("/courses/:id", (req, res) => {
  let foundCourses = db.courses.find((c) => c.id === +req.params.id);

  if (!foundCourses) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  res.json(foundCourses);
});
app.post("/courses", (req, res) => {
  if (!req.body.title) {
    res.sendStatus(400);
    return;
  }
  const createCourses = {
    id: +new Date(),
    title: req.body.title,
  };
  db.courses.push(createCourses);
  res.status(HTTP_STATUSES.CREATE_201).json(createCourses);
});
app.delete("/courses/:id", (req, res) => {
  db.courses = db.courses.filter((c) => c.id !== +req.params.id);

  res.sendStatus(HTTP_STATUSES.NO_CONTET_204);
});

app.put("/courses/:id", (req, res) => {
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
});

app.delete("/__test__/data", (req, res) => {
  db.courses = [];
  res.sendStatus(204);
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}
