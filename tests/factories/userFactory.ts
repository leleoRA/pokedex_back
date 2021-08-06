import { getRepository } from "typeorm";
import bcrypt from "bcrypt";

import User from "../../src/entities/User";

export async function createUser () {
  const user = {
    email: "email@email.com",
    password: "123456"
  }
  
  await getRepository(User).insert({
    email: user.email,
    password: bcrypt.hashSync(user.password, 12)
  });

  return user;
}
