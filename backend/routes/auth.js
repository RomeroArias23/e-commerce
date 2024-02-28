const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // For password hashing
const pool = require('../db');

// POST register a new user
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  // Check if the username or email already exists
  const userExistsQuery = 'SELECT * FROM Users WHERE username = $1 OR email = $2';
  const userExistsValues = [username, email];

  try {
    const existingUsers = await pool.query(userExistsQuery, userExistsValues);

    if (existingUsers.rows.length > 0) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the Users table
    const registerQuery = 'INSERT INTO Users (username, password_hash, email) VALUES ($1, $2, $3) RETURNING *';
    const registerValues = [username, hashedPassword, email];

    const { rows } = await pool.query(registerQuery, registerValues);

    res.status(201).json({ message: 'User registered successfully', user: rows[0] });
  } catch (error) {
    console.error('Error registering user', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post(
    '/login',
    passport.authenticate('local', {
      successRedirect: '/dashboard', // Change this to your success route
      failureRedirect: '/login', // Change this to your login page
      failureFlash: true,
    })
  );

module.exports = router;
