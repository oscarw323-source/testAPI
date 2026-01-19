import request from "supertest";
import { app, HTTP_STATUSES } from "../src/index";

describe("/courses", () => {
  beforeAll(async () => {
    await request(app).delete("/__test__/data");
  });

  it("should return 200 and empty array", async () => {
    await request(app).get("/courses").expect(HTTP_STATUSES.OK_200, []);
  });

  it("should return 404 for not existing course", async () => {
    await request(app).get("/courses/1").expect(HTTP_STATUSES.NOT_FOUND_404);
  });

  it("should not create courses with incorrect input data", async () => {
    await request(app)
      .post("/courses/")
      .send({ title: "" })
      .expect(HTTP_STATUSES.BAD_REQUEST_400);

    await request(app).get("/courses/").expect(HTTP_STATUSES.OK_200, []);
  });

  let createCourses1: any = null;
  let createCourses2: any = null;

  it("should create two courses with correct input data", async () => {
    const res1 = await request(app)
      .post("/courses/")
      .send({ title: "course 1" })
      .expect(HTTP_STATUSES.CREATE_201);

    createCourses1 = res1.body;

    const res2 = await request(app)
      .post("/courses/")
      .send({ title: "course 2" })
      .expect(HTTP_STATUSES.CREATE_201);

    createCourses2 = res2.body;

    expect(createCourses1).toEqual({
      id: expect.any(Number),
      title: "course 1",
    });

    expect(createCourses2).toEqual({
      id: expect.any(Number),
      title: "course 2",
    });

    await request(app)
      .get("/courses")
      .expect(HTTP_STATUSES.OK_200, [createCourses1, createCourses2]);
  });

  it("should not update course with incorrect input data", async () => {
    await request(app)
      .put("/courses/" + createCourses2.id)
      .send({ title: "" })
      .expect(HTTP_STATUSES.BAD_REQUEST_400);

    await request(app)
      .get("/courses/" + createCourses2.id)
      .expect(HTTP_STATUSES.OK_200, createCourses2);
  });

  it("should not update course that does not exist", async () => {
    await request(app)
      .put("/courses/" + -100)
      .send({ title: "good title" })
      .expect(HTTP_STATUSES.NOT_FOUND_404);
  });

  it("should update course with correct input data", async () => {
    await request(app)
      .put("/courses/" + createCourses1.id)
      .send({ title: "good new title" })
      .expect(HTTP_STATUSES.NO_CONTET_204);

    await request(app)
      .get("/courses/" + createCourses1.id)
      .expect(HTTP_STATUSES.OK_200, {
        ...createCourses1,
        title: "good new title",
      });
  });

  it("should delete botch course", async () => {
    await request(app)
      .delete("/courses/" + createCourses1.id)

      .expect(HTTP_STATUSES.NO_CONTET_204);

    await request(app)
      .get("/courses/" + createCourses1.id)
      .expect(HTTP_STATUSES.NOT_FOUND_404);

    await request(app)
      .get("/courses")
      .expect(HTTP_STATUSES.OK_200, [createCourses2]);
  });
});
