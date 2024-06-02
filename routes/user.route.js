import { Router } from "express";
import { userInstance } from "../controllers/user.controller.js";

// -----------------------------------------------
const userRouter = Router();
userRouter.get("/hello-world", userInstance.Hello);
userRouter.get("/profile/:username", userInstance.Profile);

// -----------------------------------------------
export { userRouter };
