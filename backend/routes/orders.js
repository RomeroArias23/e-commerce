const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all orders
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM Orders');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching all orders', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET a specific order by order_id
router.get('/:order_id', async (req, res) => {
  const { order_id } = req.params;

  try {
    const { rows } = await pool.query('SELECT * FROM Orders WHERE order_id = $1', [order_id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error(`Error fetching order with ID ${order_id}`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST create a new order
router.post('/', async (req, res) => {
  const { user_id, cart_id, total_price, order_status } = req.body;

  try {
    const { rows } = await pool.query(
      'INSERT INTO Orders (user_id, cart_id, total_price, order_status) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, cart_id, total_price, order_status]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating a new order', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT update a specific order by order_id
router.put('/:order_id', async (req, res) => {
  const { order_id } = req.params;
  const { user_id, cart_id, total_price, order_status } = req.body;

  try {
    const { rows } = await pool.query(
      'UPDATE Orders SET user_id = $1, cart_id = $2, total_price = $3, order_status = $4 WHERE order_id = $5 RETURNING *',
      [user_id, cart_id, total_price, order_status, order_id]
    );

    if (rows.length === 0) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error(`Error updating order with ID ${order_id}`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE a specific order by order_id
router.delete('/:order_id', async (req, res) => {
  const { order_id } = req.params;

  try {
    const { rows } = await pool.query('DELETE FROM Orders WHERE order_id = $1 RETURNING *', [order_id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.json({ message: 'Order deleted successfully', deletedOrder: rows[0] });
    }
  } catch (error) {
    console.error(`Error deleting order with ID ${order_id}`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
