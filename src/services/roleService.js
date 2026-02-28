import { getAllRoles, getRoleByName } from "../models/roleModel.js";

// Get all roles from the database
const fetchAllRoles = async () => {
    const roles = await getAllRoles();
    return roles;
};

// Get a role by its name with validation
const fetchRoleByName = async (name) => {
    if (!name) {
        throw { status: 400, message: "Role name is required" };
    }

    const role = await getRoleByName(name);
    if (!role) {
        throw { status: 404, message: `Role '${name}' not found` };
    }

    return role;
};

export { fetchAllRoles, fetchRoleByName };
