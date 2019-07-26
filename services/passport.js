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

// We are going to get the payload argument from an incoming request
// The payload argument is coming from the function that we will create in authRoutes
// Done is the function we call once we try to authenticate this user.
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (e) {
    done(e, false);
  }
});

// This tells passport that we declared these strategies

// When we say passport.authenticate('jwt').
// Passport will look for a strategy called 'jwt'.
// The local login says we have a strategy called 'local'.
passport.use(localLogin);
// The jwt login trategy says we have a strategy called 'jwt'.
passport.use(jwtLogin);
