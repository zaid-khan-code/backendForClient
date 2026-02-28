import {
    createAppointment,
    getAllAppointments,
    getAppointmentsByDoctor,
    getAppointmentsByPatient,
    updateAppointmentStatus,
    cancelAppointment,
} from "../models/appointmentModel.js";

// Create a new appointment with validation
const addAppointment = async (patient_id, doctor_id, date, time, notes) => {
    // Validate required fields
    if (!patient_id || !doctor_id || !date || !time) {
        throw { status: 400, message: "Patient ID, doctor ID, date, and time are required" };
    }

    const appointment = await createAppointment(patient_id, doctor_id, date, time, notes);
    return appointment;
};

// Get all appointments
const fetchAllAppointments = async () => {
    const appointments = await getAllAppointments();
    return appointments;
};

// Get appointments for a specific doctor
const fetchAppointmentsByDoctor = async (doctor_id) => {
    if (!doctor_id) {
        throw { status: 400, message: "Doctor ID is required" };
    }

    const appointments = await getAppointmentsByDoctor(doctor_id);
    return appointments;
};

// Get appointments for a specific patient
const fetchAppointmentsByPatient = async (patient_id) => {
    if (!patient_id) {
        throw { status: 400, message: "Patient ID is required" };
    }

    const appointments = await getAppointmentsByPatient(patient_id);
    return appointments;
};

// Update appointment status with validation
const modifyAppointmentStatus = async (id, status) => {
    if (!id || !status) {
        throw { status: 400, message: "Appointment ID and status are required" };
    }

    // Validate status value
    const validStatuses = ["pending", "confirmed", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
        throw {
            status: 400,
            message: "Status must be 'pending', 'confirmed', 'completed', or 'cancelled'",
        };
    }

    const appointment = await updateAppointmentStatus(id, status);
    if (!appointment) {
        throw { status: 404, message: "Appointment not found" };
    }

    return appointment;
};

// Cancel an appointment
const removeAppointment = async (id) => {
    if (!id) {
        throw { status: 400, message: "Appointment ID is required" };
    }

    const appointment = await cancelAppointment(id);
    if (!appointment) {
        throw { status: 404, message: "Appointment not found" };
    }

    return appointment;
};

export {
    addAppointment,
    fetchAllAppointments,
    fetchAppointmentsByDoctor,
    fetchAppointmentsByPatient,
    modifyAppointmentStatus,
    removeAppointment,
};
