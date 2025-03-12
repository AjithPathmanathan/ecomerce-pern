import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE } = process.env;

const pool = new pkg.Pool({
    user: PGUSER,
    host: PGHOST,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: PGPORT,
});

pool.connect()
    .then(() => console.log("✅ Connected to PostgreSQL"))
    .catch(err => console.error("❌ PostgreSQL connection error:", err));

export default pool;
