import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
    host: 'ep-ancient-frost-aiwdhnai-pooler.c-4.us-east-1.aws.neon.tech',
    port: 5432,
    database: 'neondb',
    user: 'neondb_owner',
    password: 'npg_rNXgv7nR1OSD',
    ssl: {
        rejectUnauthorized: false
    }
})

pool.connect()
    .then(() => console.log('Connected to Neon PostgreSQL successfully'))
    .catch((err) => console.error('Database connection error:', err))

export default pool
