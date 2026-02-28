import { Router } from "express";
import {
    getAllPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient,
} from "../controllers/patientController.js";

const router = Router();

// GET /api/patients — Get all patients
router.get("/", getAllPatients);

// GET /api/patients/:id — Get a patient by ID
router.get("/:id", getPatientById);

// POST /api/patients — Create a new patient
router.post("/", createPatient);

// PUT /api/patients/:id — Update a patient
router.put("/:id", updatePatient);

// DELETE /api/patients/:id — Delete a patient
router.delete("/:id", deletePatient);

export default router;
