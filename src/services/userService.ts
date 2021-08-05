import { getRepository } from "typeorm";
import bcrypt from "bcrypt";

import User from "../entities/User";
import user from "../interfaces/user"

export async function signUp (user: user) {
  const userExists = await getRepository(User).findOne({
    where: {email: user.email}
  });
  if (userExists){
    return false
  } else{
    await getRepository(User).insert({
      email: user.email,
      password: bcrypt.hashSync(user.password, 12)
    })
    return true
  }  
}
