import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import User from "../entities/User";
import Sessions from "../entities/Sessions";
import userInterface from "../interfaces/userInterface";
import userLoginInterface from "../interfaces/userLoginInterface";

export async function signUp(user: userInterface) {
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

export async function signIn(user: userLoginInterface) {
  const loggedUser = await getRepository(User).findOne({
    email: user.email
  })
  if (!loggedUser) return null;

  if (bcrypt.compareSync(user.password, loggedUser.password)){
    const token = uuidv4();
    await getRepository(Sessions).insert({userId: loggedUser.id, token})
    return token
  } else return null;
}
