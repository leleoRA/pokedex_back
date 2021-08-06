import { Request, Response } from "express";

import * as userService from "../services/userService";
import userInterface from "../interfaces/userInterface";
import userLoginInterface from "../interfaces/userLoginInterface";
import userRegistrationSchema from "../schemas/userRegistrationSchema";
import userLoginSchema from "../schemas/userLoginSchema";


export async function signUp (req: Request, res: Response) {
  const user = req.body as userInterface;
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

export async function signIn(req: Request, res: Response) {
  const user = req.body as userLoginInterface;
  if (userLoginSchema.validate(user).error){
    return res.sendStatus(400)
  }

  const token = await userService.signIn(user)
  if (!token){
    res.sendStatus(401)
  } else{
    console.log(token)
    res.send(token)
  }
}
