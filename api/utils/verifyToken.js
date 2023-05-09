import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import passport from "passport";
import jwtDecode from "jwt-decode";

const init = () => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: process.env.JWT,
  };

  passport.use(
    new JwtStrategy(opts, (decoded, done) => {
      return done(null, decoded);
    })
  );
};

const protectWithJwt = (req, res, next) => {
  return passport.authenticate("jwt", { session: false })(req, res, next);
};

export default { init, protectWithJwt };
