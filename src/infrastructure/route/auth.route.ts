import { Router } from "express";
import { schemaValidator } from "@/service/middleware/joi";
import { authenticationController } from "../controller/auth.controller";
import { loginRequestDTOSchema, registerRequestDTOSchema } from "@/constraint/validator/joi/auth.validator";

const authenticationRoutes = () => {
  const router = Router();
  router.post("/login", schemaValidator(loginRequestDTOSchema), authenticationController.login);
  router.post("/register", schemaValidator(registerRequestDTOSchema), authenticationController.register);
  return router;
};

export const authenticationRouter = authenticationRoutes();
