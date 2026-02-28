import {
    addPatient,
    fetchAllPatients,
    fetchPatientById,
    modifyPatient,
    removePatient,
} from "../services/patientService.js";

// GET /api/patients — Get all patients
const getAllPatients = async (req, res) => {
    try {
        const patients = await fetchAllPatients();
        res.status(200).json({ message: "Patients fetched successfully", data: patients });
    } catch (error) {
        res
            .status(error.status || 500)
            .json({ message: error.message || "Internal server error" });
    }
};

// GET /api/patients/:id — Get a patient by ID
const getPatientById = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await fetchPatientById(id);
        res.status(200).json({ message: "Patient fetched successfully", data: patient });
    } catch (error) {
        res
            .status(error.status || 500)
            .json({ message: error.message || "Internal server error" });
    }
};

// POST /api/patients — Create a new patient
const createPatient = async (req, res) => {
    try {
        const { user_id, name, age, gender, contact, blood_group } = req.body;
        const patient = await addPatient(user_id, name, age, gender, contact, blood_group);
        res.status(201).json({ message: "Patient created successfully", data: patient });
    } catch (error) {
        res
            .status(error.status || 500)
            .json({ message: error.message || "Internal server error" });
    }
};

// PUT /api/patients/:id — Update a patient
const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const patient = await modifyPatient(id, data);
        res.status(200).json({ message: "Patient updated successfully", data: patient });
    } catch (error) {
        res
            .status(error.status || 500)
            .json({ message: error.message || "Internal server error" });
    }
};

// DELETE /api/patients/:id — Delete a patient
const deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await removePatient(id);
        res.status(200).json({ message: "Patient deleted successfully", data: patient });
    } catch (error) {
        res
            .status(error.status || 500)
            .json({ message: error.message || "Internal server error" });
    }
};

export { getAllPatients, getPatientById, createPatient, updatePatient, deletePatient };
