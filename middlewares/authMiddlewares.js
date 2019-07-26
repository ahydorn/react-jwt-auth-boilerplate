const passport = require('passport');

// By default, passport wants to use cookie-based authentication for the user, but we want to use tokens, so we need to set session to false
// In our case, we are using token, so we set this behavior to false.
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = {
  requireAuth,
  requireSignIn
};
