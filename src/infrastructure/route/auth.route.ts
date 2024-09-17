import { Router } from "express";
import { schemaValidator } from "@/service/middleware/shemaValidator";
import { authenticationController } from "../controller/auth.controller";
import { LoginSchema, RegisterSchema } from "@/constraint/validator/zod/auth.validator";

const authenticationRoutes = () => {
  const router = Router();
  router.post("/login", schemaValidator(LoginSchema), authenticationController.login);
  router.post("/register", schemaValidator(RegisterSchema), authenticationController.register);
  return router;
};

export const authenticationRouter = authenticationRoutes();
