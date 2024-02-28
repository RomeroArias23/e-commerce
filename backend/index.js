const express = require('express');
const pool = require('./db');

const app = express();
const port = 3000; // You can use any available port

const passport = require('passport');
const session = require('express-session');

// Import route modules
const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const userCartsRoutes = require('./routes/userCarts');
const ordersRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');

app.use(express.json()); // Enable JSON parsing middleware

//middleware
function logger(req, res, next) {
  console.log(`[${Date.now()}] ${req.method} ${req.url}`);
  next();
};

app.use(logger);

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.get('/greet/:name', (req, res) => {
  res.json({ greeting: `Hello ${req.params.name}!` });
});

// Define a route to fetch users from the database
app.get('/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM Users');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Use route modules
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/user-carts', userCartsRoutes);
app.use('/orders', ordersRoutes);

app.use('/auth', authRoutes);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
