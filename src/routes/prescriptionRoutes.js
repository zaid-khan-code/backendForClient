import { Router } from "express";
import {
    getPrescriptionsByPatient,
    getPrescriptionsByDoctor,
    createPrescription,
} from "../controllers/prescriptionController.js";

const router = Router();

// GET /api/prescriptions/patient/:patient_id — Get prescriptions by patient
router.get("/patient/:patient_id", getPrescriptionsByPatient);

// GET /api/prescriptions/doctor/:doctor_id — Get prescriptions by doctor
router.get("/doctor/:doctor_id", getPrescriptionsByDoctor);

// POST /api/prescriptions — Create a new prescription
router.post("/", createPrescription);

export default router;
