import {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient,
} from "../models/patientModel.js";

// Create a new patient with validation
const addPatient = async (user_id, name, age, gender, contact, blood_group) => {
    // Validate required fields
    if (!name || !age || !gender || !contact) {
        throw { status: 400, message: "Name, age, gender, and contact are required" };
    }

    // Validate age range
    if (age <= 0 || age >= 150) {
        throw { status: 400, message: "Age must be between 1 and 149" };
    }

    // Validate gender
    const validGenders = ["male", "female", "other"];
    if (!validGenders.includes(gender)) {
        throw { status: 400, message: "Gender must be 'male', 'female', or 'other'" };
    }

    // Validate blood group if provided
    if (blood_group) {
        const validBloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
        if (!validBloodGroups.includes(blood_group)) {
            throw { status: 400, message: "Invalid blood group" };
        }
    }

    const patient = await createPatient(user_id, name, age, gender, contact, blood_group);
    return patient;
};

// Get all patients
const fetchAllPatients = async () => {
    const patients = await getAllPatients();
    return patients;
};

// Get a single patient by ID
const fetchPatientById = async (id) => {
    if (!id) {
        throw { status: 400, message: "Patient ID is required" };
    }

    const patient = await getPatientById(id);
    if (!patient) {
        throw { status: 404, message: "Patient not found" };
    }

    return patient;
};

// Update an existing patient with validation
const modifyPatient = async (id, data) => {
    if (!id) {
        throw { status: 400, message: "Patient ID is required" };
    }

    const existingPatient = await getPatientById(id);
    if (!existingPatient) {
        throw { status: 404, message: "Patient not found" };
    }

    const patient = await updatePatient(id, data);
    return patient;
};

// Delete a patient with validation
const removePatient = async (id) => {
    if (!id) {
        throw { status: 400, message: "Patient ID is required" };
    }

    const existingPatient = await getPatientById(id);
    if (!existingPatient) {
        throw { status: 404, message: "Patient not found" };
    }

    const patient = await deletePatient(id);
    return patient;
};

export {
    addPatient,
    fetchAllPatients,
    fetchPatientById,
    modifyPatient,
    removePatient,
};
