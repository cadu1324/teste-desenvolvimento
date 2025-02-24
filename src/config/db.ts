import dotenv from 'dotenv';
import { Client, types } from 'pg';

dotenv.config();

const databaseConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
};

types.setTypeParser(types.builtins.NUMERIC, (value) => parseFloat(value));

const pool = new Client({
  ssl: { rejectUnauthorized: false },
  connectionString: `postgres://${databaseConfig.user}:${databaseConfig.password}@${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.database}`,
});

pool.connect();

export default {
  ...pool,
  query: async (text: string, params?: any[]) => {
    const result = await pool.query(text, params);
    return result.rows;
  },
  getOne: async (text: string, params?: any[]) => {
    const result = await pool.query(text, params);
    return result.rows[0];
  },
};
