import pool from "../config/db.js";

// Create a new appointment
const createAppointment = async (patient_id, doctor_id, date, time, notes) => {
    const result = await pool.query(
        `INSERT INTO appointments (patient_id, doctor_id, date, time, notes)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
        [patient_id, doctor_id, date, time, notes || null]
    );
    return result.rows[0];
};

// Get all appointments — JOIN with patients and users (doctor) to get names
const getAllAppointments = async () => {
    const result = await pool.query(
        `SELECT appointments.*,
            patients.name AS patient_name,
            users.name AS doctor_name
     FROM appointments
     JOIN patients ON appointments.patient_id = patients.id
     JOIN users ON appointments.doctor_id = users.id
     ORDER BY appointments.date DESC, appointments.time DESC`
    );
    return result.rows;
};

// Get appointments by doctor ID — JOIN with patients to get patient name
const getAppointmentsByDoctor = async (doctor_id) => {
    const result = await pool.query(
        `SELECT appointments.*,
            patients.name AS patient_name,
            users.name AS doctor_name
     FROM appointments
     JOIN patients ON appointments.patient_id = patients.id
     JOIN users ON appointments.doctor_id = users.id
     WHERE appointments.doctor_id = $1
     ORDER BY appointments.date DESC, appointments.time DESC`,
        [doctor_id]
    );
    return result.rows;
};

// Get appointments by patient ID — JOIN with users (doctor) to get doctor name
const getAppointmentsByPatient = async (patient_id) => {
    const result = await pool.query(
        `SELECT appointments.*,
            patients.name AS patient_name,
            users.name AS doctor_name
     FROM appointments
     JOIN patients ON appointments.patient_id = patients.id
     JOIN users ON appointments.doctor_id = users.id
     WHERE appointments.patient_id = $1
     ORDER BY appointments.date DESC, appointments.time DESC`,
        [patient_id]
    );
    return result.rows;
};

// Update appointment status by ID
const updateAppointmentStatus = async (id, status) => {
    const result = await pool.query(
        `UPDATE appointments
     SET status = $1, updated_at = NOW()
     WHERE id = $2
     RETURNING *`,
        [status, id]
    );
    return result.rows[0];
};

// Cancel appointment — soft cancel by setting status to 'cancelled'
const cancelAppointment = async (id) => {
    const result = await pool.query(
        `UPDATE appointments
     SET status = 'cancelled', updated_at = NOW()
     WHERE id = $1
     RETURNING *`,
        [id]
    );
    return result.rows[0];
};

export {
    createAppointment,
    getAllAppointments,
    getAppointmentsByDoctor,
    getAppointmentsByPatient,
    updateAppointmentStatus,
    cancelAppointment,
};
