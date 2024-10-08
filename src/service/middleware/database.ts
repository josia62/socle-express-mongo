import mongoose from "mongoose";
import { logger } from "../../common/logger";
import { configs } from "../../data/constants/configs";

const { MONGO_URI } = configs;

if (!configs.MONGO_URI) {
  throw "MONGO_URI environment variable required";
}

export const databaseConnect = async () => {
  try {
    logger.info(`Mongo URI: ${MONGO_URI}`);
    const mongooseInstance = await mongoose.connect(MONGO_URI);
    logger.info("Database connection success");
    return mongooseInstance;
  } catch (error) {
    return Promise.reject(error);
  }
};
