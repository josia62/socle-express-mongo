import type { Request, Response, NextFunction } from "express";

import { HttpStatus } from "../../data/constants/http-status";
import { userSA } from "../../service/applicatif/user.sa";
import passport from "../../service/middleware/passport";
import { generateTokens } from "../../service/middleware/passport/passport-local";
import { passportStrategies } from "../../service/middleware/passport/passport-strategies";

class AuthenticationController {
  login = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(passportStrategies.frontLocal, { session: false }, async (err, user) => {
      if (err && !user) {
        res.locals.statusCode = HttpStatus.BAD_REQUEST;
        next(err);
      } else {
        try {
          const { accessToken, refreshToken } = await generateTokens(user);
          const currentUser = await userSA.findById(user.id);
          res.locals.data = { accessToken, refreshToken, currentUser };
          next();
        } catch (error) {
          next(error);
        }
      }
    })(req, res, next);
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    try {
      const user = await userSA.create(body);
      const { accessToken, refreshToken } = await generateTokens(user);
      res.locals.data = { accessToken, refreshToken, user };
      res.locals.status = HttpStatus.CREATED;
      return next();
    } catch (error) {
      return next(error);
    }
  };
}

export const authenticationController = new AuthenticationController();
