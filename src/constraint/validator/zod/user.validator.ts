import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);
export type User = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
});
