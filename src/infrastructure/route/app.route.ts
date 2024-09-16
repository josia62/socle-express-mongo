import * as path from "node:path";
import { Router } from "express";
import multer from "multer";

import { userRouter } from "./user.route";
import { authenticationRouter } from "./auth.route";

export const uploadFilePath = path.resolve(__dirname, "../..", "file/uploads");

const storageFile = multer.diskStorage({
  destination: uploadFilePath,
});

// initialisation dossier de destination
multer({
  storage: storageFile,
});

const appRoutes = () => {
  const router = Router();
  router.use("/auth", authenticationRouter);
  router.use("/user", userRouter);
  return router;
};

export const appRouter = appRoutes();
