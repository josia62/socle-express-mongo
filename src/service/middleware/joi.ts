import type Joi from "joi";
import { HttpStatus } from "../../data/constants/http-status";
import { Exception } from "./exception-handler";

const mapper = {
  email: "Adresse email",
};

export const schemaValidator = (schema: Joi.Schema) => (req, res, next) => {
  if (!schema) {
    next();
  } else {
    const { body } = req;
    const { error, value } = schema.validate(body, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    });
    req.body = value;

    if (error) {
      // console.log({ error });
      const formattedError = error.details
        .map(({ path }) => `${path.map((p) => `${mapper[p] || p} invalide`).join(", ")}`)
        .join(", ");

      next(new Exception(HttpStatus.BAD_REQUEST, formattedError));
    } else {
      next();
    }
  }
};
