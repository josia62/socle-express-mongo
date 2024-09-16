import * as jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";

import { configs } from "../../../data/constants/configs";
import { Exception } from "../exception-handler";
import { HttpStatus } from "../../../data/constants/http-status";
import { userSA } from "../../applicatif/user.sa";
import { userSM } from "@/service/metier/user.sm";

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

export const frontLocalStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      const user = await userSM.findOne({ email });
      if (!user) {
        return done({ message: "Email non trouvé dans la base" });
      }
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        return done({ message: "Mot de passe incorrect" });
      }
      const { id } = user;
      return done(null, { id, email });
    } catch (error) {
      return done(error);
    }
  },
);
