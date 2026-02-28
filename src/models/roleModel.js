import pool from "../config/db.js";

// Get all roles
const getAllRoles = async () => {
    const result = await pool.query("SELECT * FROM roles ORDER BY id");
    return result.rows;
};

// Get a single role by its ID
const getRoleById = async (id) => {
    const result = await pool.query("SELECT * FROM roles WHERE id = $1", [id]);
    return result.rows[0];
};

// Get a single role by its name
const getRoleByName = async (name) => {
    const result = await pool.query("SELECT * FROM roles WHERE name = $1", [
        name,
    ]);
    return result.rows[0];
};

export { getAllRoles, getRoleById, getRoleByName };
