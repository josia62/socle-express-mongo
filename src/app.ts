import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";

import { openAPIRouter } from "@/api-docs/openAPIRouter";
import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import { configs } from "@/data/constants/configs";
import { databaseConnect } from "./service/middleware/database";
import { logger } from "./common/logger";
import { responseFormatter } from "./service/middleware/response-formatter";
import { exceptionHandler } from "./service/middleware/exception-handler";

const { PORT, CORS_ORIGIN, NODE_ENV } = configs;
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
    NODE_ENV !== "production" && app.use(openAPIRouter);
    app.use(errorHandler());
    app.use(exceptionHandler);
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
