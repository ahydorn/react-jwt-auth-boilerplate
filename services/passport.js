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

passport.use(localLogin);
