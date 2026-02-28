import pool from "../config/db.js";

// Create a new diagnosis log
const createDiagnosis = async (patient_id, doctor_id, symptoms, diagnosis) => {
    const result = await pool.query(
        `INSERT INTO diagnosis_logs (patient_id, doctor_id, symptoms, diagnosis)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
        [patient_id, doctor_id, symptoms, diagnosis]
    );
    return result.rows[0];
};

// Get diagnosis logs by patient ID — JOIN with patients and users (doctor)
const getDiagnosisByPatient = async (patient_id) => {
    const result = await pool.query(
        `SELECT diagnosis_logs.*,
            patients.name AS patient_name,
            users.name AS doctor_name
     FROM diagnosis_logs
     JOIN patients ON diagnosis_logs.patient_id = patients.id
     JOIN users ON diagnosis_logs.doctor_id = users.id
     WHERE diagnosis_logs.patient_id = $1
     ORDER BY diagnosis_logs.created_at DESC`,
        [patient_id]
    );
    return result.rows;
};

// Get diagnosis logs by doctor ID — JOIN with patients and users (doctor)
const getDiagnosisByDoctor = async (doctor_id) => {
    const result = await pool.query(
        `SELECT diagnosis_logs.*,
            patients.name AS patient_name,
            users.name AS doctor_name
     FROM diagnosis_logs
     JOIN patients ON diagnosis_logs.patient_id = patients.id
     JOIN users ON diagnosis_logs.doctor_id = users.id
     WHERE diagnosis_logs.doctor_id = $1
     ORDER BY diagnosis_logs.created_at DESC`,
        [doctor_id]
    );
    return result.rows;
};

export {
    createDiagnosis,
    getDiagnosisByPatient,
    getDiagnosisByDoctor,
};
