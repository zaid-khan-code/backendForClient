import pool from "../config/db.js";

// Find user by email — JOIN with roles to get role name
const findByEmail = async (email) => {
    const result = await pool.query(
        `SELECT users.*, roles.name AS role_name
     FROM users
     JOIN roles ON users.role_id = roles.id
     WHERE users.email = $1`,
        [email]
    );
    return result.rows[0];
};

// Find user by ID — JOIN with roles to get role name
const findById = async (id) => {
    const result = await pool.query(
        `SELECT users.*, roles.name AS role_name
     FROM users
     JOIN roles ON users.role_id = roles.id
     WHERE users.id = $1`,
        [id]
    );
    return result.rows[0];
};

// Create a new user
const createUser = async (name, email, password, role_id, specialty) => {
    const result = await pool.query(
        `INSERT INTO users (name, email, password, role_id, specialty)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
        [name, email, password, role_id, specialty || null]
    );
    return result.rows[0];
};

// Get all doctors — users whose role name is 'doctor'
const getAllDoctors = async () => {
    const result = await pool.query(
        `SELECT users.*, roles.name AS role_name
     FROM users
     JOIN roles ON users.role_id = roles.id
     WHERE roles.name = 'doctor'
     ORDER BY users.id`
    );
    return result.rows;
};

// Get all receptionists — users whose role name is 'receptionist'
const getAllReceptionists = async () => {
    const result = await pool.query(
        `SELECT users.*, roles.name AS role_name
     FROM users
     JOIN roles ON users.role_id = roles.id
     WHERE roles.name = 'receptionist'
     ORDER BY users.id`
    );
    return result.rows;
};

// Update user by ID — only updates provided fields
const updateUser = async (id, data) => {
    const { name, email, password, role_id, specialty } = data;
    const result = await pool.query(
        `UPDATE users
     SET name = COALESCE($1, name),
         email = COALESCE($2, email),
         password = COALESCE($3, password),
         role_id = COALESCE($4, role_id),
         specialty = COALESCE($5, specialty),
         updated_at = NOW()
     WHERE id = $6
     RETURNING *`,
        [name || null, email || null, password || null, role_id || null, specialty || null, id]
    );
    return result.rows[0];
};

// Delete user by ID
const deleteUser = async (id) => {
    const result = await pool.query(
        "DELETE FROM users WHERE id = $1 RETURNING *",
        [id]
    );
    return result.rows[0];
};

export {
    findByEmail,
    findById,
    createUser,
    getAllDoctors,
    getAllReceptionists,
    updateUser,
    deleteUser,
};
