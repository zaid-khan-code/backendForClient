import {
    createDiagnosis,
    getDiagnosisByPatient,
    getDiagnosisByDoctor,
} from "../models/diagnosisModel.js";

// Create a new diagnosis log with validation
const addDiagnosis = async (patient_id, doctor_id, symptoms, diagnosis) => {
    // Validate required fields
    if (!patient_id || !doctor_id || !symptoms || !diagnosis) {
        throw {
            status: 400,
            message: "Patient ID, doctor ID, symptoms, and diagnosis are required",
        };
    }

    const diagnosisLog = await createDiagnosis(patient_id, doctor_id, symptoms, diagnosis);
    return diagnosisLog;
};

// Get diagnosis logs for a specific patient
const fetchDiagnosisByPatient = async (patient_id) => {
    if (!patient_id) {
        throw { status: 400, message: "Patient ID is required" };
    }

    const diagnosisLogs = await getDiagnosisByPatient(patient_id);
    return diagnosisLogs;
};

// Get diagnosis logs by a specific doctor
const fetchDiagnosisByDoctor = async (doctor_id) => {
    if (!doctor_id) {
        throw { status: 400, message: "Doctor ID is required" };
    }

    const diagnosisLogs = await getDiagnosisByDoctor(doctor_id);
    return diagnosisLogs;
};

export {
    addDiagnosis,
    fetchDiagnosisByPatient,
    fetchDiagnosisByDoctor,
};
