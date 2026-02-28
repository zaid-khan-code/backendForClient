import pool from "../config/db.js";

// Create a new patient
const createPatient = async (user_id, name, age, gender, contact, blood_group) => {
    const result = await pool.query(
        `INSERT INTO patients (user_id, name, age, gender, contact, blood_group)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
        [user_id || null, name, age, gender, contact, blood_group || null]
    );
    return result.rows[0];
};

// Get all patients
const getAllPatients = async () => {
    const result = await pool.query(
        "SELECT * FROM patients ORDER BY id"
    );
    return result.rows;
};

// Get a single patient by ID
const getPatientById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM patients WHERE id = $1",
        [id]
    );
    return result.rows[0];
};

// Update patient by ID — only updates provided fields
const updatePatient = async (id, data) => {
    const { user_id, name, age, gender, contact, blood_group } = data;
    const result = await pool.query(
        `UPDATE patients
     SET user_id = COALESCE($1, user_id),
         name = COALESCE($2, name),
         age = COALESCE($3, age),
         gender = COALESCE($4, gender),
         contact = COALESCE($5, contact),
         blood_group = COALESCE($6, blood_group),
         updated_at = NOW()
     WHERE id = $7
     RETURNING *`,
        [user_id || null, name || null, age || null, gender || null, contact || null, blood_group || null, id]
    );
    return result.rows[0];
};

// Delete patient by ID
const deletePatient = async (id) => {
    const result = await pool.query(
        "DELETE FROM patients WHERE id = $1 RETURNING *",
        [id]
    );
    return result.rows[0];
};

export {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient,
};
