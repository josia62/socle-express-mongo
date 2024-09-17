import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { Router } from "express";
import { z } from "zod";

import { genericRoute } from "../../common/infrastructure/generic.route";
import { userController } from "../controller/user.controller";
import { UserSchema } from "@/constraint/validator/zod/user.validator";

export const userRegistry = new OpenAPIRegistry();

userRegistry.registerPath({
  method: "get",
  path: "/user",
  tags: ["User"],
  responses: createApiResponse(z.array(UserSchema), "Success"),
});

const userRoutes = () => {
  const router = genericRoute({
    controller: userController,
    schema: UserSchema,
    isSecured: false,
  });
  return router;
};

export const userRouter = userRoutes();
