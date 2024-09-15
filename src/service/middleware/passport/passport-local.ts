import * as jwt from "jsonwebtoken";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

import { configs } from "../../../data/constants/configs";
import { Exception } from "../exception-handler";
import { HttpStatus } from "../../../data/constants/http-status";
import { userSA } from "../../applicatif/user.sa";

export const verifyToken = (token: string, secret: string): Promise<any> =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error: any, readable: any) => {
      if (!error && readable) {
        const { iat, exp, ...rest } = readable;
        resolve(rest);
      } else {
        reject(error);
      }
    });
  });

export const generateResetToken = (user: any) =>
  jwt.sign(user, configs.PWD_RESET_SECRET, { expiresIn: configs.PWD_RESET_EXPIRATION });

export const generateTokens = (user: any) => {
  const accessToken = jwt.sign(user, configs.JWT_SECRET, { expiresIn: configs.JWT_EXPIRATION });
  const refreshToken = jwt.sign(user, configs.JWT_SECRET, {
    expiresIn: configs.JWT_REFRESH_TOKEN_EXPIRATION,
  });

  return { accessToken, refreshToken };
};

export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: configs.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken()]),
  },
  async (jwtPayload: any, done: any) => {
    try {
      const user = await userSA.findById(jwtPayload.id);

      if (user) {
        done(null, user);
      } else {
        done(new Exception(HttpStatus.BAD_REQUEST, "Invalid token"));
      }
    } catch (error) {
      done(error);
    }
  },
);
