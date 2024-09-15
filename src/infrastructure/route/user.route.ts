import { Router } from "express";
import { userController } from "../controller/user.controller";

const userRoutes = () => {
  const router = Router();
  router.get("/", userController.getUsers);
  return router;
};

export const userRouter = userRoutes();
