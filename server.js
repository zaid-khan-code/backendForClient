// Load environment variables first
import "dotenv/config";

import express from "express";
import cors from "cors";

// Import route files
import roleRoutes from "./src/routes/roleRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import patientRoutes from "./src/routes/patientRoutes.js";
import appointmentRoutes from "./src/routes/appointmentRoutes.js";
import prescriptionRoutes from "./src/routes/prescriptionRoutes.js";
import diagnosisRoutes from "./src/routes/diagnosisRoutes.js";

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON request bodies

// Mount routes
app.use("/api/roles", roleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/diagnosis", diagnosisRoutes);

// Health check route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Clinic Management API is running" });
});

// Start server
const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT} and url is http://localhost:5000/`);
    
});
