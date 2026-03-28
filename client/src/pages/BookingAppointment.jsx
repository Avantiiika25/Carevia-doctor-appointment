import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { motion } from "framer-motion";

export default function BookingAppointment() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    doctorName: "",
    department: "",
    date: "",
    time: "",
    comments: "",
    report: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "report") {
      setFormData((prev) => ({ ...prev, report: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key]) payload.append(key, formData[key]);
      });

      await axiosInstance.post("/appointments", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/appointments");
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 px-4 py-10">

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl bg-white/80 backdrop-blur-lg border border-white/40 rounded-3xl shadow-2xl p-8"
      >

        {/* HEADING */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
          Book Appointment
        </h1>

        {/* ERROR */}
        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-100 px-4 py-3 rounded-xl">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Doctor + Department */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Doctor Name
              </label>
              <input
                type="text"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleChange}
                required
                placeholder="Dr. Rahul Sharma"
                className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition shadow-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition shadow-sm"
              >
                <option value="">Select Department</option>
                <option>Cardiology</option>
                <option>Orthopedics</option>
                <option>Dermatology</option>
                <option>Neurology</option>
                <option>General Physician</option>
              </select>
            </div>
          </div>

          {/* Date + Time */}
          <div className="grid md:grid-cols-2 gap-5">

            {/* DATE */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition shadow-sm"
              />
            </div>

            {/* 🔥 TIME (UPDATED UI) */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-600">
                Time
              </label>

              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-12 focus:ring-2 focus:ring-pink-500 focus:bg-white outline-none transition shadow-sm appearance-none"
              />

              {/* Clock Icon */}
              <span className="absolute right-4 top-[38px] text-gray-400">
                ⏰
              </span>
            </div>
          </div>

          {/* Comments */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Comments
            </label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows="3"
              placeholder="Describe symptoms..."
              className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition shadow-sm"
            />
          </div>

          {/* 🔥 FILE UPLOAD (MODERN STYLE) */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Upload Report
            </label>

            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-5 text-center hover:border-indigo-400 transition cursor-pointer bg-gray-50">
              <input
                type="file"
                name="report"
                accept="image/*,.pdf"
                onChange={handleChange}
                className="hidden"
                id="fileUpload"
              />

              <label htmlFor="fileUpload" className="cursor-pointer">
                <p className="text-gray-500 text-sm">
                  📎 Click to upload or drag file
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG, PDF (1 file)
                </p>
              </label>
            </div>
          </div>

          {/* 🚀 BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-pink-500 shadow-lg hover:scale-[1.03] hover:shadow-xl transition duration-300 disabled:opacity-60"
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}