import {
    addPrescription,
    fetchPrescriptionsByPatient,
    fetchPrescriptionsByDoctor,
} from "../services/prescriptionService.js";

// GET /api/prescriptions/patient/:patient_id — Get prescriptions by patient
const getPrescriptionsByPatient = async (req, res) => {
    try {
        const { patient_id } = req.params;
        const prescriptions = await fetchPrescriptionsByPatient(patient_id);
        res
            .status(200)
            .json({ message: "Prescriptions fetched successfully", data: prescriptions });
    } catch (error) {
        res
            .status(error.status || 500)
            .json({ message: error.message || "Internal server error" });
    }
};

// GET /api/prescriptions/doctor/:doctor_id — Get prescriptions by doctor
const getPrescriptionsByDoctor = async (req, res) => {
    try {
        const { doctor_id } = req.params;
        const prescriptions = await fetchPrescriptionsByDoctor(doctor_id);
        res
            .status(200)
            .json({ message: "Prescriptions fetched successfully", data: prescriptions });
    } catch (error) {
        res
            .status(error.status || 500)
            .json({ message: error.message || "Internal server error" });
    }
};

// POST /api/prescriptions — Create a new prescription
const createPrescription = async (req, res) => {
    try {
        const { patient_id, doctor_id, medicines, dosage, notes } = req.body;
        const prescription = await addPrescription(
            patient_id,
            doctor_id,
            medicines,
            dosage,
            notes
        );
        res
            .status(201)
            .json({ message: "Prescription created successfully", data: prescription });
    } catch (error) {
        res
            .status(error.status || 500)
            .json({ message: error.message || "Internal server error" });
    }
};

export { getPrescriptionsByPatient, getPrescriptionsByDoctor, createPrescription };
