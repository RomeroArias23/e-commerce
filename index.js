const express = require('express');
const app = express();
const port = 3000; // You can use any available port

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
