import dotenv from "dotenv";
import { cleanEnv, str, num, host, port } from "envalid";

// Load .env variables into process.env
dotenv.config();

// Validate and clean environment variables
export const configs = cleanEnv(process.env, {
  NODE_ENV: str({ default: "development", choices: ["development", "production", "test"] }),
  HOST: host({ default: "localhost" }),
  PORT: port({ default: 3000 }),
  CORS_ORIGIN: str({ default: "http://localhost:3000" }),
  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ default: 1000 }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({ default: 1000 }),
  MONGO_URI: str({ default: "" }),
  JWT_EXPIRATION: str({ default: "3600s" }),
  JWT_REFRESH_TOKEN_EXPIRATION: str({ default: "3600s" }),
  JWT_SECRET: str({ default: "" }),
  PWD_RESET_EXPIRATION: str({ default: "3600s" }),
  PWD_RESET_SECRET: str({ default: "" }),
});
