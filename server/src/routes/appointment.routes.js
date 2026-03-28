import { Router } from "express";
import {
  createAppointment,
  getMyAppointments,
  updateAppointmentStatus,
} from "../controllers/appointment.controller.js";

import { upload } from "../middlewares/multer.middleware.js"; // ✅ ADD THIS

const router = Router();

/* ================= CREATE ================= */
router.post("/", upload.single("report"), createAppointment); // ✅ FIX

/* ================= GET ================= */
router.get("/", getMyAppointments);

/* ================= UPDATE ================= */
router.patch("/:appointmentId", updateAppointmentStatus);

export default router;