// passport.js
const passport = require('passport');
const bcrypt = require('bcryptjs');
const GoogleStrategy = require('passport-google-oidc');

// Initialize Passport
passport.use(new GoogleStrategy({
    clientID: process.env['698689174844-ocbp2a8j1qgq105d1er74fr4364ippir.apps.googleusercontent.com'],
    clientSecret: process.env['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'],
    callbackURL: 'http://localhost:3000/'
  },
  function(issuer, profile, cb) {
    // Your authentication logic using Google Strategy
  }
));

module.exports = passport;
