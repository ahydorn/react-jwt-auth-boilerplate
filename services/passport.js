const passport = require('passport');
const User = require('./../models/User');
const config = require('./../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy

// By default LocalStragey is expecting a username and password
// We don't have a username. We have an email, so we need to override that.
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(
  localOptions,
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false);
      }
      user.comparePassword(password, (error, isMatch) => {
        if (err) return done(err);
        if (!isMatch) {
          return done(null, false);
        }
        return done(null, user);
      });
    } catch (e) {
      done(e, false);
    }
  }
);

// Set up options for jwt (json web tokens) strategy
// Must tell strategy where to look for tokens

const jwtOptions = {
  // Tells jwt strategy that whenever a request comes in and we want
  // passport to handle it, it needs to look in the header for the
  // property called authorization.
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  // Tells jwt strategy what secret we use to encode the token
  // so that it can decode it
  secretOrKey: config.secret
};

passport.use(localLogin);
