import pg from "pg";
const { Pool } = pg;

// Create PostgreSQL connection pool using environment variables
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

// Test database connection
pool
    .connect()
    .then((client) => {
        console.log("✅ Connected to PostgreSQL database successfully");
        client.release();
    })
    .catch((err) => {
        console.error("❌ Failed to connect to PostgreSQL database:", err.message);
    });

export default pool; 
