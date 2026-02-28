import { Router } from "express";
import { getAllRoles, getRoleByName } from "../controllers/roleController.js";

const router = Router();

// GET /api/roles — Get all roles
router.get("/", getAllRoles);

// GET /api/roles/:name — Get a role by name
router.get("/:name", getRoleByName);

export default router;
