import pool from "../config/db.js";

// Create a new prescription
const createPrescription = async (patient_id, doctor_id, medicines, dosage, notes) => {
    const result = await pool.query(
        `INSERT INTO prescriptions (patient_id, doctor_id, medicines, dosage, notes)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
        [patient_id, doctor_id, medicines, dosage, notes || null]
    );
    return result.rows[0];
};

// Get prescriptions by patient ID — JOIN with patients and users (doctor)
const getPrescriptionsByPatient = async (patient_id) => {
    const result = await pool.query(
        `SELECT prescriptions.*,
            patients.name AS patient_name,
            users.name AS doctor_name
     FROM prescriptions
     JOIN patients ON prescriptions.patient_id = patients.id
     JOIN users ON prescriptions.doctor_id = users.id
     WHERE prescriptions.patient_id = $1
     ORDER BY prescriptions.created_at DESC`,
        [patient_id]
    );
    return result.rows;
};

// Get prescriptions by doctor ID — JOIN with patients and users (doctor)
const getPrescriptionsByDoctor = async (doctor_id) => {
    const result = await pool.query(
        `SELECT prescriptions.*,
            patients.name AS patient_name,
            users.name AS doctor_name
     FROM prescriptions
     JOIN patients ON prescriptions.patient_id = patients.id
     JOIN users ON prescriptions.doctor_id = users.id
     WHERE prescriptions.doctor_id = $1
     ORDER BY prescriptions.created_at DESC`,
        [doctor_id]
    );
    return result.rows;
};

export {
    createPrescription,
    getPrescriptionsByPatient,
    getPrescriptionsByDoctor,
};
