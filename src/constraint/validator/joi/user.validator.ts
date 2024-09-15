import * as Joi from "joi";

export const userRequestDTOSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  age: Joi.number().required(),
});
