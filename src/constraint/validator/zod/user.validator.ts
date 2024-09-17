import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);
export const UserSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  age: z.number().int().positive(),
  email: z.string().email(),
  password: z.string().min(8),
});
export type User = z.infer<typeof UserSchema>;
