import pkg from "pg";
import dotenv from "dotenv";
const { Pool } = pkg;

dotenv.config();

const poolConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

console.log(
  process.env.DB_USER,
  process.env.DB_HOST,
  process.env.DB_DATABASE,
  process.env.DB_PASSWORD,
  process.env.DB_PORT
);

const pool = new Pool(poolConfig);

// Log when the pool successfully connects
pool.on("connect", (client) => {
  console.log("Connected to the database");
});

// Handle pool errors (e.g., network issues)
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export default pool;
