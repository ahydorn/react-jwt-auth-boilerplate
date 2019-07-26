const db = require('./../models');
const jwt = require('jwt-simple');
const config = require('./../config');

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  // sub === subject
  // iat === issues at time
  // This will encode the whole first object and then add secret to it.
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

module.exports = {
  signUp: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(422)
        .json({ error: 'You must provide an email and password' });
    }

    try {
      // Check if user exists
      const existingUser = await db.User.findOne({ email });
      //   If user exists, throw error
      if (existingUser) {
        return res.status(422).json({ error: 'Email already in use' });
      }
      //   Shorthand for email: email, password: password
      const user = new db.User({ email, password });
      await user.save();
      res.json({ token: tokenForUser(user) });
    } catch (e) {
      res.status(404).json({ e });
    }
  },
  signIn: (req, res) => {
    res.send("I'm hit");
  }
};
