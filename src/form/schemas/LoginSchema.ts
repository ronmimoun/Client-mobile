import { z } from "zod";

export const LOGIN_SCHEMA = z.object({
  password: z.string(),
  username: z.string().min(3).max(20),
});

export type LoginForm = z.infer<typeof LOGIN_SCHEMA>;
