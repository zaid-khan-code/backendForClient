import {
    createPrescription,
    getPrescriptionsByPatient,
    getPrescriptionsByDoctor,
} from "../models/prescriptionModel.js";

// Create a new prescription with validation
const addPrescription = async (patient_id, doctor_id, medicines, dosage, notes) => {
    // Validate required fields
    if (!patient_id || !doctor_id || !medicines || !dosage) {
        throw {
            status: 400,
            message: "Patient ID, doctor ID, medicines, and dosage are required",
        };
    }

    const prescription = await createPrescription(patient_id, doctor_id, medicines, dosage, notes);
    return prescription;
};

// Get prescriptions for a specific patient
const fetchPrescriptionsByPatient = async (patient_id) => {
    if (!patient_id) {
        throw { status: 400, message: "Patient ID is required" };
    }

    const prescriptions = await getPrescriptionsByPatient(patient_id);
    return prescriptions;
};

// Get prescriptions by a specific doctor
const fetchPrescriptionsByDoctor = async (doctor_id) => {
    if (!doctor_id) {
        throw { status: 400, message: "Doctor ID is required" };
    }

    const prescriptions = await getPrescriptionsByDoctor(doctor_id);
    return prescriptions;
};

export {
    addPrescription,
    fetchPrescriptionsByPatient,
    fetchPrescriptionsByDoctor,
};
