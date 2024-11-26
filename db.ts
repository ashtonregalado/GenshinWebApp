//db.ts

import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Create a new pool instance
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
