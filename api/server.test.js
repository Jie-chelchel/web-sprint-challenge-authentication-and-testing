const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
afterAll(async () => {
  await db.destroy();
});

describe("[POST] /api/auth/register", () => {
  test("responds with the new user", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "ss3s", password: "123" });
    expect(res.body).toMatchObject({ id: 1, username: "ss3s" });
  });
  test("users number increases", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "aaa", password: "123e" });
    const users = await db("users");
    expect(users.length).toBe(2);
  });
});

describe("[POST] /api/auth/login", () => {
  test("check login status 200", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "ss3s", password: "123" });
    expect(res.status).toBe(200);
  });
  test("check login with wrong password", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "ss3s", password: "1234" });
    expect(res.status).toBe(401);
  });
});

describe("[GET] /api/jokes", () => {
  test("cannot get jokes without token", async () => {
    const res = await request(server).get("/api/jokes");
    expect(res.status).toBe(401);
  });
});

test("sanity", () => {
  expect(true).toBe(true);
});
