import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";

import { openAPIRouter } from "@/api-docs/openAPIRouter";
import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import { configs } from "@/data/constants/configs";
import { databaseConnect } from "./service/middleware/database";
import { responseFormatter } from "./service/middleware/response-formatter";

export const logger = pino({ name: "server start" });

const { PORT, CORS_ORIGIN } = configs;
export const app = express();

class App {
  private initMiddlewares = async () => {
    app.set("trust proxy", true);
    app.set("timeout", 600000);
    app.use(express.urlencoded({ extended: true, limit: "25mb" }));
    app.use(express.json({ limit: "25mb" }));
    app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
    app.use(rateLimiter);
    app.use(helmet());
    const { default: passport } = await import("./service/middleware/passport");
    app.use(passport.initialize());
  };

  private initRoutes = async () => {
    app.use(requestLogger);
    const { appRouter } = await import("./infrastructure/route/app.route");
    app.use("/api", appRouter, responseFormatter);
    app.use(openAPIRouter);
    app.use(errorHandler());
  };

  public init = async () => {
    try {
      await databaseConnect();
      await this.initMiddlewares();
      await this.initRoutes();
      return app.listen(PORT, () => logger.info(`Listening on ${PORT}`));
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

export default new App();
