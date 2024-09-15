require("dotenv-flow").config();

const {
  UPLOAD_DIR: uploadDir,
  PORT: port,
  JWT_SECRET: jwtSecret,
  JWT_EXPIRATION: jwtExpiration,
  JWT_REFRESH_TOKEN_EXPIRATION: jwtRefreshTokenExpiration,
  PWD_RESET_EXPIRATION: passwordResetExpiration,
  PWD_RESET_SECRET: passwordResetSecret,
  EMAIL_USER: emailUser,
  EMAIL_PASSWORD: emailPassword,
  MONGO_URI: mongoUri,
  HASH_KEY: hashKeyCrypto,
} = process.env;

export const configs = {
  hashKeyCrypto,
  mongoUri,
  emailUser,
  emailPassword,
  uploadDir,
  port,
  jwtSecret,
  jwtExpiration,
  jwtRefreshTokenExpiration,
  passwordResetExpiration,
  passwordResetSecret,
};
