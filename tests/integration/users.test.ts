import "../../src/setup";
import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createUser } from "../factories/userFactory";
import { clearDatabase } from "../utils/database";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

const agent = supertest(app);

describe("POST /sign-up", () => {
  it("should answer with status 200 when valid params", async () => {
    const user = await createUser();

    const response = await agent.post("/sign-up").send(user);
   
    expect(response.status).toBe(201);
  });

  it("should answer with status 400 when password is invalid", async () => {
    const user = await createUser();
    user.password = "12345"

    const response = await agent.post("/sign-up").send(user);
   
    expect(response.status).toBe(400);
  })

  it("should answer with status 400 when email is invalid", async () => {
    const user = await createUser();
    user.email = "qwerty"

    const response = await agent.post("/sign-up").send(user);
   
    expect(response.status).toBe(400);
  })
});
