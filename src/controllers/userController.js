import {
    registerUser,
    fetchAllDoctors,
    fetchAllReceptionists,
    modifyUser,
    removeUser,
} from "../services/userService.js";

// GET /api/users/doctors — Get all doctors
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await fetchAllDoctors();
        res.status(200).json({ message: "Doctors fetched successfully", data: doctors });
    } catch (error) {
        res
            .status(error.status || 500)
            .json({ message: error.message || "Internal server error" });
    }
};

// GET /api/users/receptionists — Get all receptionists
const getAllReceptionists = async (req, res) => {
    try {
        const receptionists = await fetchAllReceptionists();
        res
            .status(200)
            .json({ message: "Receptionists fetched successfully", data: receptionists });
    } catch (error) {
        res
            .status(error.status || 500)
            .json({ message: error.message || "Internal server error" });
    }
};

// POST /api/users — Create a new user
const createUser = async (req, res) => {
    try {
        const { name, email, password, role_id, specialty } = req.body;
        const user = await registerUser(name, email, password, role_id, specialty);
        res.status(201).json({ message: "User created successfully", data: user });
    } catch (error) {
        res
            .status(error.status || 500)
            .json({ message: error.message || "Internal server error" });
    }
};

// PUT /api/users/:id — Update a user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const user = await modifyUser(id, data);
        res.status(200).json({ message: "User updated successfully", data: user });
    } catch (error) {
        res
            .status(error.status || 500)
            .json({ message: error.message || "Internal server error" });
    }
};

// DELETE /api/users/:id — Delete a user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await removeUser(id);
        res.status(200).json({ message: "User deleted successfully", data: user });
    } catch (error) {
        res
            .status(error.status || 500)
            .json({ message: error.message || "Internal server error" });
    }
};

export { getAllDoctors, getAllReceptionists, createUser, updateUser, deleteUser };
