import {
    findByEmail,
    findById,
    createUser,
    getAllDoctors,
    getAllReceptionists,
    updateUser,
    deleteUser,
} from "../models/userModel.js";

// Create a new user with validation
const registerUser = async (name, email, password, role_id, specialty) => {
    // Validate required fields
    if (!name || !email || !password || !role_id) {
        throw { status: 400, message: "Name, email, password, and role_id are required" };
    }

    // Check if email already exists
    const existingUser = await findByEmail(email);
    if (existingUser) {
        throw { status: 400, message: "Email already exists" };
    }

    const user = await createUser(name, email, password, role_id, specialty);
    return user;
};

// Get all doctors
const fetchAllDoctors = async () => {
    const doctors = await getAllDoctors();
    return doctors;
};

// Get all receptionists
const fetchAllReceptionists = async () => {
    const receptionists = await getAllReceptionists();
    return receptionists;
};

// Update an existing user with validation
const modifyUser = async (id, data) => {
    if (!id) {
        throw { status: 400, message: "User ID is required" };
    }

    // Check if user exists
    const existingUser = await findById(id);
    if (!existingUser) {
        throw { status: 404, message: "User not found" };
    }

    // If email is being updated, check uniqueness
    if (data.email) {
        const emailUser = await findByEmail(data.email);
        if (emailUser && emailUser.id !== parseInt(id)) {
            throw { status: 400, message: "Email already in use by another user" };
        }
    }

    const user = await updateUser(id, data);
    return user;
};

// Delete a user with validation
const removeUser = async (id) => {
    if (!id) {
        throw { status: 400, message: "User ID is required" };
    }

    const existingUser = await findById(id);
    if (!existingUser) {
        throw { status: 404, message: "User not found" };
    }

    const user = await deleteUser(id);
    return user;
};

export {
    registerUser,
    fetchAllDoctors,
    fetchAllReceptionists,
    modifyUser,
    removeUser,
};
