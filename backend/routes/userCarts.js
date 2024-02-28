const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all user carts
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM UserCarts');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching all user carts', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET a specific user cart by cart_id
router.get('/:cart_id', async (req, res) => {
  const { cart_id } = req.params;

  try {
    const { rows } = await pool.query('SELECT * FROM UserCarts WHERE cart_id = $1', [cart_id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'User cart not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error(`Error fetching user cart with ID ${cart_id}`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST create a new user cart
router.post('/', async (req, res) => {
  try {
    const { rows } = await pool.query('INSERT INTO UserCarts DEFAULT VALUES RETURNING *');

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating a new user cart', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/:cart_id/checkout', async (req, res) => {
  const { cart_id } = req.params;

  try {
    // Validate the cart to ensure it exists
    const cartResult = await pool.query('SELECT * FROM UserCarts WHERE cart_id = $1', [cart_id]);
    
    if (cartResult.rows.length === 0) {
      return res.status(404).json({ error: 'User cart not found' });
    }

    // Process payment (for simplicity, assume it always succeeds)
    // You can integrate with a payment gateway in a later stage
    // Example: const paymentResult = await processPayment(req.body.paymentDetails);

    // Create an order to reflect the successful payment
    const orderResult = await pool.query(
      'INSERT INTO Orders (cart_id, total_amount, payment_status) VALUES ($1, $2, $3) RETURNING *',
      [cart_id, cartResult.rows[0].total_amount, 'success']
    );

    res.status(201).json({ message: 'Checkout successful', order: orderResult.rows[0] });
  } catch (error) {
    console.error(`Error processing checkout for user cart with ID ${cart_id}`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// PUT update a specific user cart by cart_id
router.put('/:cart_id', async (req, res) => {
  const { cart_id } = req.params;

  try {
    const { rows } = await pool.query('UPDATE UserCarts SET updated_at = CURRENT_TIMESTAMP WHERE cart_id = $1 RETURNING *', [cart_id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'User cart not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error(`Error updating user cart with ID ${cart_id}`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE a specific user cart by cart_id
router.delete('/:cart_id', async (req, res) => {
  const { cart_id } = req.params;

  try {
    const { rows } = await pool.query('DELETE FROM UserCarts WHERE cart_id = $1 RETURNING *', [cart_id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'User cart not found' });
    } else {
      res.json({ message: 'User cart deleted successfully', deletedUserCart: rows[0] });
    }
  } catch (error) {
    console.error(`Error deleting user cart with ID ${cart_id}`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
