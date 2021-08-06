import { getRepository } from "typeorm";
import bcrypt from "bcrypt";

import User from "../../src/entities/User";
import Sessions from "../../src/entities/Sessions";

export async function createUser() {
  const user = {
    email: "email@email.com",
    password: "123456"
  }
  
  const response = await getRepository(User).insert({
    email: user.email,
    password: bcrypt.hashSync(user.password, 12)
  });

  const { id } = response.generatedMaps[0];      
  return { ...user, id }
}

export async function createSession(userId: number) {
  const session = {userId, token:"4578-6213"}
  
  await getRepository(Sessions).insert({ token: session.token, userId });

  return session;
}
