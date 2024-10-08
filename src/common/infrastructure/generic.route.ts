import { Router } from "express";
import { schemaValidator } from "../../service/middleware/shemaValidator";

import { conditionnalJwtPassport } from "../../service/middleware/passport/conditionnal-jwt-passport";
import { responseFormatter } from "../../service/middleware/response-formatter";

export type RouteOption = {
  controller: any;
  schema?: any;
  router?: Router;
  isSecured?: boolean;
  name?: string;
};

export const genericRoute = (option: RouteOption) => {
  const { controller, isSecured = false, router = Router(), schema = null, name } = option;

  router.get("/findall", conditionnalJwtPassport(isSecured), controller.findAll, responseFormatter);

  router
    .route("/:id")
    .get(conditionnalJwtPassport(isSecured), controller.findById, responseFormatter)
    .delete(conditionnalJwtPassport(isSecured), controller.delete, responseFormatter)
    .put(conditionnalJwtPassport(isSecured), controller.partialUpdate, responseFormatter);

  router
    .route("")
    .get(conditionnalJwtPassport(isSecured), controller.findMany, responseFormatter)
    .post(conditionnalJwtPassport(isSecured), schemaValidator(schema), controller.create, responseFormatter);

  router.get("/one", conditionnalJwtPassport(isSecured), controller.findOne, responseFormatter);

  return router;
};
