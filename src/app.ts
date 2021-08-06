import "./setup";

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userController from "./controllers/userController";
import { error } from "./middlewares/error"

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.signUp);
app.post("/sign-in", userController.signIn);

app.use(error);

export async function init () {
  await connectDatabase();
}

export default app;
