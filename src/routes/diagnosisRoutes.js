import { Router } from "express";
import {
    getDiagnosisByPatient,
    getDiagnosisByDoctor,
    createDiagnosis,
} from "../controllers/diagnosisController.js";

const router = Router();

// GET /api/diagnosis/patient/:patient_id — Get diagnosis logs by patient
router.get("/patient/:patient_id", getDiagnosisByPatient);

// GET /api/diagnosis/doctor/:doctor_id — Get diagnosis logs by doctor
router.get("/doctor/:doctor_id", getDiagnosisByDoctor);

// POST /api/diagnosis — Create a new diagnosis log
router.post("/", createDiagnosis);

export default router;
