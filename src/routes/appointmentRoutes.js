import { Router } from "express";
import {
    getAllAppointments,
    getAppointmentsByDoctor,
    getAppointmentsByPatient,
    createAppointment,
    updateAppointmentStatus,
    cancelAppointment,
} from "../controllers/appointmentController.js";

const router = Router();

// GET /api/appointments — Get all appointments
router.get("/", getAllAppointments);

// GET /api/appointments/doctor/:doctor_id — Get appointments by doctor
router.get("/doctor/:doctor_id", getAppointmentsByDoctor);

// GET /api/appointments/patient/:patient_id — Get appointments by patient
router.get("/patient/:patient_id", getAppointmentsByPatient);

// POST /api/appointments — Create a new appointment
router.post("/", createAppointment);

// PUT /api/appointments/:id/status — Update appointment status
router.put("/:id/status", updateAppointmentStatus);

// DELETE /api/appointments/:id — Cancel an appointment
router.delete("/:id", cancelAppointment);

export default router;
