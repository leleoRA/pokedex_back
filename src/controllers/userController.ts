import { Request, Response } from "express";

import * as userService from "../services/userService";
import User from "../interfaces/user";
import userRegistrationSchema from "../schemas/userRegistrationSchema";

export async function signUp (req: Request, res: Response) {
  const user = req.body as User;
  if (userRegistrationSchema.validate(user).error){
    return res.sendStatus(400)
  }

  const result = await userService.signUp(user)
  if (!result){
    res.sendStatus(409)
  } else{
    res.sendStatus(201)
  }
}
