import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../api/axiosInstance.js";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  Stethoscope,
} from "lucide-react";

/* 🔥 Dynamic Images */
const departmentImages = {
  Cardiology:
    "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg",
  Orthopedics:
    "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg",
  Dermatology:
    "https://images.pexels.com/photos/7581573/pexels-photo-7581573.jpeg",
  Neurology:
    "https://images.pexels.com/photos/8376178/pexels-photo-8376178.jpeg",
  "General Physician":
    "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg",
};

const fallbackImage =
  "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg";

export default function Appointments() {
  const { userData } = useSelector((state) => state.user);
  const userType = userData?.userType;

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState("all");
  const [error, setError] = useState("");

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axiosInstance.get("/appointments");
      const allAppointments = res?.data?.data || [];

      if (userType === "Admin") {
        setAppointments(allAppointments);
      } else {
        const now = new Date();
        const upcoming = allAppointments.filter(
          (appt) => new Date(appt.date) >= now
        );
        setAppointments(upcoming);
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Appointments API not available"
      );
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData) fetchAppointments();
  }, [userData]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await axiosInstance.patch(`/appointments/${id}`, { status });
      fetchAppointments();
    } catch (err) {
      alert(err?.response?.data?.message || "Update failed");
    }
  };

  const filteredAppointments =
    year === "all"
      ? appointments
      : appointments.filter(
          (a) => new Date(a.date).getFullYear().toString() === year
        );

  if (loading) {
    return <div className="p-8 text-center">Loading appointments...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">⚠️ {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-4 sm:p-8">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
          {userType === "Admin" ? "All Appointments" : "My Appointments"}
        </h1>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Years</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
        </select>
      </div>

      {filteredAppointments.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No appointments available.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAppointments.map((appt, index) => (
            <motion.div
              key={appt._id || index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition duration-500 overflow-hidden border border-gray-100"
            >
              {/* IMAGE */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={
                    departmentImages[appt.department] || fallbackImage
                  }
                  alt="Appointment"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                {/* Status Badge */}
                <span
                  className={`absolute top-3 right-3 px-3 py-1 text-xs rounded-full font-semibold capitalize
                  ${
                    appt.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : appt.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {appt.status || "pending"}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-5 space-y-3">
                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                  {userType === "Admin"
                    ? `Patient: ${appt.patientName || "N/A"}`
                    : `Dr. ${appt.doctorName || "N/A"}`}
                </h2>

                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Stethoscope size={16} />
                  <span>{appt.department || "General"}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <CalendarDays size={16} />
                  <span>
                    {appt.date
                      ? new Date(appt.date).toDateString()
                      : "No date"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Clock size={16} />
                  <span>{appt.time || "N/A"}</span>
                </div>

                {/* ADMIN */}
                {userType === "Admin" && appt.status === "pending" && (
                  <div className="flex gap-3 pt-3">
                    <button
                      onClick={() =>
                        handleStatusUpdate(appt._id, "confirmed")
                      }
                      className="flex-1 bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition"
                    >
                      Confirm
                    </button>

                    <button
                      onClick={() =>
                        handleStatusUpdate(appt._id, "cancelled")
                      }
                      className="flex-1 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {/* USER */}
                {userType !== "Admin" &&
                  appt.status === "confirmed" && (
                    <button
                      className="mt-3 w-full py-2 rounded-xl font-medium text-white bg-gradient-to-r from-indigo-600 to-pink-500 hover:scale-[1.03] transition"
                      onClick={() =>
                        alert("Video consultation coming soon 🚀")
                      }
                    >
                      Join Appointment
                    </button>
                  )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}