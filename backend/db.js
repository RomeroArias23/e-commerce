const { Pool } = require('pg');

// Create a new Pool instance with your database connection details
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'diegoromero',
  password: '',
  port: 5432, 
});

module.exports = pool;
