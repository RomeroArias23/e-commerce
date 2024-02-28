const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./db'); // Update the path based on your project structure
const bcrypt = require('bcrypt');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query('SELECT * FROM Users WHERE username = $1', [username]);

      if (rows.length === 0) {
        return done(null, false, { message: 'Incorrect username or password' });
      }

      const user = rows[0];

      // Compare the entered password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password_hash);

      if (!passwordMatch) {
        return done(null, false, { message: 'Incorrect username or password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query('SELECT * FROM Users WHERE user_id = $1', [id]);

    if (rows.length === 0) {
      return done(null, false);
    }

    const user = rows[0];
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});
