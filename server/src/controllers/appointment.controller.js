import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Appointment } from "../models/appointment.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

/* ================= CREATE APPOINTMENT ================= */
const createAppointment = asyncHandler(async (req, res) => {
  const { date, time, department, doctorName, comments } = req.body;

  // ✅ Validation
  if (!date || !time || !department || !doctorName) {
    throw new ApiError(400, "Required fields missing");
  }

  // ✅ Prevent past date
  const appointmentDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (appointmentDate < today) {
    throw new ApiError(400, "Cannot book appointment for past date");
  }

  // ✅ Upload file (optional)
  let reportUrl = "";
  if (req.file?.path) {
    try {
      const uploaded = await uploadOnCloudinary(req.file.path);
      reportUrl = uploaded?.secure_url || "";
    } catch (err) {
      console.log("Cloudinary error:", err.message);
    }
  }

  // ✅ FIXED USER (IMPORTANT)
  const user = req.user || {
    _id: new mongoose.Types.ObjectId(), // ✅ FIX
    name: "Guest User",
  };

  const appointment = await Appointment.create({
    patient: user._id,
    patientName: user.name,
    date: appointmentDate,
    time,
    department,
    doctorName,
    comments,
    report: reportUrl,
  });

  return res.status(201).json(
    new ApiResponse(201, appointment, "Appointment booked successfully")
  );
});

/* ================= GET ================= */
const getMyAppointments = asyncHandler(async (req, res) => {
  let appointments = [];

  if (!req.user) {
    appointments = await Appointment.find().sort({ createdAt: -1 });
  } else if (req.user.userType === "Admin") {
    appointments = await Appointment.find().sort({ createdAt: -1 });
  } else {
    appointments = await Appointment.find({
      patient: req.user._id,
    }).sort({ createdAt: -1 });
  }

  return res.status(200).json(
    new ApiResponse(200, appointments, "Appointments fetched")
  );
});

/* ================= UPDATE ================= */
const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;
  const { status } = req.body;

  if (!["confirmed", "cancelled"].includes(status)) {
    throw new ApiError(400, "Invalid status value");
  }

  const appointment = await Appointment.findById(appointmentId);

  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }

  if (appointment.status === "cancelled") {
    throw new ApiError(400, "Cannot update cancelled appointment");
  }

  appointment.status = status;
  await appointment.save();

  return res.status(200).json(
    new ApiResponse(200, appointment, `Appointment ${status}`)
  );
});

export {
  createAppointment,
  getMyAppointments,
  updateAppointmentStatus,
};