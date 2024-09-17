import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";
import { HttpStatus } from "../../data/constants/http-status";
import { Exception } from "./exception-handler";

export const schemaValidator = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
  if (!schema) {
    next();
  } else {
    const { body } = req;
    const result = schema.safeParse(body);
    if (!result.success) {
      const formattedError = result.error.errors
        .map(({ path, message }) => `${path.map((p) => `${p} invalide`).join(", ")}: ${message}`)
        .join(", ");
      next(new Exception(HttpStatus.BAD_REQUEST, formattedError));
    } else {
      req.body = result.data;
      next();
    }
  }
};
