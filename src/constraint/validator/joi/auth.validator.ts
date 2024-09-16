import Joi from "joi";
import { userRequestDTOSchema } from "./user.validator";

export const loginRequestDTOSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const registerRequestDTOSchema = userRequestDTOSchema.keys({
  confirmationPassword: Joi.string().required().valid(Joi.ref("password")),
});
