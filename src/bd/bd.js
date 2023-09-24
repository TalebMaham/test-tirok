const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'real_estate',
  password: 'sidi',
  port: 5432, // Port par défaut de PostgreSQL
});