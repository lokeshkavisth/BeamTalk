import express from "express";
import { validationHandler } from "../middlewarers/validationHandler.js";
import { registerUser } from "../controllers/userController/registerUser.js";
import { userSchema } from "../schemas/userSchema.js";

const userRoutes = express.Router();

userRoutes.post(
  "/register",
  validationHandler(userSchema, "body"),
  registerUser
);

export default userRoutes;
