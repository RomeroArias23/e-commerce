const express = require('express');
const router = express.Router();
const pool = require('../db'); // Update the path if your db.js file is in a different location

// GET all users
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM Users');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching all users', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET a specific user by user_id
router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const { rows } = await pool.query('SELECT * FROM Users WHERE user_id = $1', [user_id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error(`Error fetching user with ID ${user_id}`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST create a new user
router.post('/', async (req, res) => {
  const { username, password_hash, email } = req.body;

  try {
    const { rows } = await pool.query(
      'INSERT INTO Users (username, password_hash, email) VALUES ($1, $2, $3) RETURNING *',
      [username, password_hash, email]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating a new user', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT update a specific user by user_id
router.put('/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const { username, password_hash, email } = req.body;

  try {
    const { rows } = await pool.query(
      'UPDATE Users SET username = $1, password_hash = $2, email = $3 WHERE user_id = $4 RETURNING *',
      [username, password_hash, email, user_id]
    );

    if (rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error(`Error updating user with ID ${user_id}`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE a specific user by user_id
router.delete('/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const { rows } = await pool.query('DELETE FROM Users WHERE user_id = $1 RETURNING *', [user_id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ message: 'User deleted successfully', deletedUser: rows[0] });
    }
  } catch (error) {
    console.error(`Error deleting user with ID ${user_id}`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
