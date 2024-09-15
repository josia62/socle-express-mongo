import { Router } from "express";
import type * as Joi from "joi";
import { schemaValidator } from "../../service/middleware/joi";
import { imageUpload } from "../../service/middleware/multer";

import { conditionnalJwtPassport } from "../../service/middleware/passport/conditionnal-jwt-passport";
import { responseFormatter } from "../../service/middleware/response-formatter";

export type RouteOption = {
  controller: any;
  schema?: Joi.Schema;
  router?: Router;
  isSecured?: boolean;
};

export const genericRoute = (option: RouteOption) => {
  const { controller, isSecured = false, router = Router(), schema = null } = option;

  router
    .route("/")
    .get(conditionnalJwtPassport(isSecured), controller.findAll, responseFormatter)
    .post(conditionnalJwtPassport(isSecured), schemaValidator(schema), controller.create, responseFormatter)
    .put(conditionnalJwtPassport(isSecured), schemaValidator(schema), controller.update, responseFormatter);

  router.get("/findOne", conditionnalJwtPassport(isSecured), controller.findOne, responseFormatter);
  router
    .route("/:id")
    .get(conditionnalJwtPassport(isSecured), controller.findById, responseFormatter)
    .put(conditionnalJwtPassport(isSecured), controller.update, responseFormatter)
    .delete(conditionnalJwtPassport(isSecured), controller.delete, responseFormatter);
  router.put("/partialUpdate/:id", conditionnalJwtPassport(isSecured), controller.partialUpdate, responseFormatter);
  router.delete("/delete-many", conditionnalJwtPassport(isSecured), controller.deleteMany, responseFormatter);

  return router;
};
