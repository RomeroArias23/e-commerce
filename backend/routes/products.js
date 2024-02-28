const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all products
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM Products');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching all products', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET a specific product by product_id
router.get('/:product_id', async (req, res) => {
  const { product_id } = req.params;

  try {
    const { rows } = await pool.query('SELECT * FROM Products WHERE product_id = $1', [product_id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error(`Error fetching product with ID ${product_id}`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST create a new product
router.post('/', async (req, res) => {
  const { name, description, price, quantity_available } = req.body;

  try {
    const { rows } = await pool.query(
      'INSERT INTO Products (name, description, price, quantity_available) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, price, quantity_available]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating a new product', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT update a specific product by product_id
router.put('/:product_id', async (req, res) => {
  const { product_id } = req.params;
  const { name, description, price, quantity_available } = req.body;

  try {
    const { rows } = await pool.query(
      'UPDATE Products SET name = $1, description = $2, price = $3, quantity_available = $4 WHERE product_id = $5 RETURNING *',
      [name, description, price, quantity_available, product_id]
    );

    if (rows.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error(`Error updating product with ID ${product_id}`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE a specific product by product_id
router.delete('/:product_id', async (req, res) => {
  const { product_id } = req.params;

  try {
    const { rows } = await pool.query('DELETE FROM Products WHERE product_id = $1 RETURNING *', [product_id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json({ message: 'Product deleted successfully', deletedProduct: rows[0] });
    }
  } catch (error) {
    console.error(`Error deleting product with ID ${product_id}`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
