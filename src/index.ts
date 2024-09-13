import { env } from "@/common/utils/envConfig";
import { app, logger } from "@/server";
import { AppDataSource } from "./data-source";
import "reflect-metadata";

AppDataSource.initialize()
  .then(() => {
    logger.info("Database connected successfully");
    const server = app.listen(env.PORT, () => {
      const { NODE_ENV, HOST, PORT } = env;
      logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
    });

    const onCloseSignal = () => {
      logger.info("SIGINT/SIGTERM received, shutting down");
      server.close(() => {
        logger.info("Server closed");
        process.exit();
      });
      setTimeout(() => process.exit(1), 10000).unref();
    };

    process.on("SIGINT", onCloseSignal);
    process.on("SIGTERM", onCloseSignal);
  })
  .catch((error) => {
    logger.error("Error connecting to the database", error);
    process.exit(1);
  });
