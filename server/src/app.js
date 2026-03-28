import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

import userRoutes from "./routes/user.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import serviceRoutes from "./routes/service.routes.js";
const app = express();

// Body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Test routes
app.get("/", (_, res) => {
  res.send("Server is running");
});

app.get("/test", (req, res) => {
  res.send("Test route working ✅");
});

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/services", serviceRoutes); // ✅ ADD THIS
app.use("/api/v1/appointments", appointmentRoutes);
// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

export { app };