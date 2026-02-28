import { Router } from "express";
import {
    getAllDoctors,
    getAllReceptionists,
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/userController.js";

const router = Router();

// GET /api/users/doctors — Get all doctors
router.get("/doctors", getAllDoctors);

// GET /api/users/receptionists — Get all receptionists
router.get("/receptionists", getAllReceptionists);

// POST /api/users — Create a new user
router.post("/", createUser);

// PUT /api/users/:id — Update a user
router.put("/:id", updateUser);

// DELETE /api/users/:id — Delete a user
router.delete("/:id", deleteUser);

export default router;
