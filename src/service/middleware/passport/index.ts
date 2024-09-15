import * as passport from "passport";

import { jwtStrategy } from "./passport-local";

passport.use(jwtStrategy);
export default passport;
