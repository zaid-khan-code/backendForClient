import {
    addDiagnosis,
    fetchDiagnosisByPatient,
    fetchDiagnosisByDoctor,
} from "../services/diagnosisService.js";

// GET /api/diagnosis/patient/:patient_id — Get diagnosis logs by patient
const getDiagnosisByPatient = async (req, res) => {
    try {
        const { patient_id } = req.params;
        const diagnosisLogs = await fetchDiagnosisByPatient(patient_id);
        res
            .status(200)
            .json({ message: "Diagnosis logs fetched successfully", data: diagnosisLogs });
    } catch (error) {
        res
            .status(error.status || 500)
            .json({ message: error.message || "Internal server error" });
    }
};

// GET /api/diagnosis/doctor/:doctor_id — Get diagnosis logs by doctor
const getDiagnosisByDoctor = async (req, res) => {
    try {
        const { doctor_id } = req.params;
        const diagnosisLogs = await fetchDiagnosisByDoctor(doctor_id);
        res
            .status(200)
            .json({ message: "Diagnosis logs fetched successfully", data: diagnosisLogs });
    } catch (error) {
        res
            .status(error.status || 500)
            .json({ message: error.message || "Internal server error" });
    }
};

// POST /api/diagnosis — Create a new diagnosis log
const createDiagnosis = async (req, res) => {
    try {
        const { patient_id, doctor_id, symptoms, diagnosis } = req.body;
        const diagnosisLog = await addDiagnosis(patient_id, doctor_id, symptoms, diagnosis);
        res
            .status(201)
            .json({ message: "Diagnosis log created successfully", data: diagnosisLog });
    } catch (error) {
        res
            .status(error.status || 500)
            .json({ message: error.message || "Internal server error" });
    }
};

export { getDiagnosisByPatient, getDiagnosisByDoctor, createDiagnosis };
