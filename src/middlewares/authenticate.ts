import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService";

export async function authenticate(req: Request, res: Response, next: NextFunction){
    const authorization = req.headers['authorization'];
    const token = authorization?.split("Bearer ")[1];
  
    const user = await authService.validateSession(token);
    if (!user) return res.sendStatus(401);
    
    next();
  }