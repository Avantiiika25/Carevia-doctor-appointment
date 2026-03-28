import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

// Start server FIRST
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

// THEN connect DB
connectDB()
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB Connection Failed", err));