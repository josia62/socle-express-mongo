import * as passport from "passport";

import { frontLocalStrategy, jwtStrategy } from "./passport-local";
import { passportStrategies } from "./passport-strategies";

passport.use(jwtStrategy);
passport.use(passportStrategies.frontLocal, frontLocalStrategy);
export default passport;
