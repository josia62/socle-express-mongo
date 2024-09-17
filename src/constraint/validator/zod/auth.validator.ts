import { z } from "zod";
import { UserSchema } from "./user.validator";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const RegisterSchema = UserSchema.extend({
  confirmationPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmationPassword, {
  message: "Passwords must match",
  path: ["confirmationPassword"],
});
