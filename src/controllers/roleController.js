import { fetchAllRoles, fetchRoleByName } from "../services/roleService.js";

// GET /api/roles — Get all roles
const getAllRoles = async (req, res) => {
    try {
        const roles = await fetchAllRoles();
        res.status(200).json({ message: "Roles fetched successfully", data: roles });
    } catch (error) {
        res
            .status(error.status || 500)
            .json({ message: error.message || "Internal server error" });
    }
};

// GET /api/roles/:name — Get a role by name
const getRoleByName = async (req, res) => {
    try {
        const { name } = req.params;
        const role = await fetchRoleByName(name);
        res.status(200).json({ message: "Role fetched successfully", data: role });
    } catch (error) {
        res
            .status(error.status || 500)
            .json({ message: error.message || "Internal server error" });
    }
};

export { getAllRoles, getRoleByName };
