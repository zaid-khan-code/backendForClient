import {
    addAppointment,
    fetchAllAppointments,
    fetchAppointmentsByDoctor,
    fetchAppointmentsByPatient,
    modifyAppointmentStatus,
    removeAppointment,
} from "../services/appointmentService.js";

// GET /api/appointments — Get all appointments
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await fetchAllAppointments();
        res
            .status(200)
            .json({ message: "Appointments fetched successfully", data: appointments });
    } catch (error) {
        res
            .status(error.status || 500)
            .json({ message: error.message || "Internal server error" });
    }
};

// GET /api/appointments/doctor/:doctor_id — Get appointments by doctor
const getAppointmentsByDoctor = async (req, res) => {
    try {
        const { doctor_id } = req.params;
        const appointments = await fetchAppointmentsByDoctor(doctor_id);
        res
            .status(200)
            .json({ message: "Appointments fetched successfully", data: appointments });
    } catch (error) {
        res
            .status(error.status || 500)
            .json({ message: error.message || "Internal server error" });
    }
};

// GET /api/appointments/patient/:patient_id — Get appointments by patient
const getAppointmentsByPatient = async (req, res) => {
    try {
        const { patient_id } = req.params;
        const appointments = await fetchAppointmentsByPatient(patient_id);
        res
            .status(200)
            .json({ message: "Appointments fetched successfully", data: appointments });
    } catch (error) {
        res
            .status(error.status || 500)
            .json({ message: error.message || "Internal server error" });
    }
};

// POST /api/appointments — Create a new appointment
const createAppointment = async (req, res) => {
    try {
        const { patient_id, doctor_id, date, time, notes } = req.body;
        const appointment = await addAppointment(patient_id, doctor_id, date, time, notes);
        res
            .status(201)
            .json({ message: "Appointment created successfully", data: appointment });
    } catch (error) {
        res
            .status(error.status || 500)
            .json({ message: error.message || "Internal server error" });
    }
};

// PUT /api/appointments/:id/status — Update appointment status
const updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const appointment = await modifyAppointmentStatus(id, status);
        res
            .status(200)
            .json({ message: "Appointment status updated successfully", data: appointment });
    } catch (error) {
        res
            .status(error.status || 500)
            .json({ message: error.message || "Internal server error" });
    }
};

// DELETE /api/appointments/:id — Cancel an appointment
const cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await removeAppointment(id);
        res
            .status(200)
            .json({ message: "Appointment cancelled successfully", data: appointment });
    } catch (error) {
        res
            .status(error.status || 500)
            .json({ message: error.message || "Internal server error" });
    }
};

export {
    getAllAppointments,
    getAppointmentsByDoctor,
    getAppointmentsByPatient,
    createAppointment,
    updateAppointmentStatus,
    cancelAppointment,
};
