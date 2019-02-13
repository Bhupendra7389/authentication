const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const User = require("../models/User");
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authentication"),
      secretOrKey: "mysecret"
    },
    async (payload, done) => {
      console.log("payload", payload);
      const user = await User.findById(payload.email);
      try {
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
