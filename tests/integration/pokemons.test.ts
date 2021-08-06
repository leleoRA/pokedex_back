import "../../src/setup";
import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { clearDatabase } from "../utils/database";
import { createUser, createSession } from "../factories/userFactory"

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
  it("should answer with status 201 when token is valid", async () => {
    const user = await createUser();
    const session = await createSession(user.id);

    const response = await agent.get("/pokemons").set("Authorization", `Bearer ${session.token}`);

    expect(response.status).toBe(200);
  });

  it("shoul answer with status 401 when doesn't exists", async () => {
    const response = await agent.get("/pokemons").set("Authorization", `Bearer dfhdfhdfh`);

    expect(response.status).toBe(401);
  })
})