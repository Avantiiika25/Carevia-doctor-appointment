import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import { login } from "../features/slices/authSlice";
import { motion } from "framer-motion";

const Profile = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    age: userData?.age || "",
    height: userData?.height || "",
    weight: userData?.weight || "",
    address: userData?.address || "",
    city: userData?.city || "",
    state: userData?.state || "",
    zipcode: userData?.zipcode || "",
  });

  const fieldLabels = {
    name: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    age: "Age",
    height: "Height (cm)",
    weight: "Weight (kg)",
    address: "Address",
    city: "City",
    state: "State",
    zipcode: "Zip Code",
  };

  const [preview, setPreview] = useState(userData?.avatar || "");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setLoading(true);
        setPreview(URL.createObjectURL(file));

        const payload = new FormData();
        payload.append("avatar", file);

        const res = await axiosInstance.patch("/users/update-avatar", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        dispatch(login(res.data.data));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axiosInstance.patch("/users/update-profile", formData);
      dispatch(login(res.data.data));
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-10 px-4">

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto bg-white/80 backdrop-blur-lg border border-white/40 shadow-2xl rounded-3xl p-8"
      >

        {/* HEADER */}
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
          Patient Profile
        </h1>

        {/* AVATAR */}
        <div className="flex items-center gap-6 mb-10">
          <div className="relative group">
            <img
              src={
                preview ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
            />

            {/* Overlay */}
            <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm rounded-full cursor-pointer transition">
              Change
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div>
            <p className="text-lg font-semibold text-gray-800">
              {formData.name || "Your Name"}
            </p>
            <p className="text-sm text-gray-500">
              {formData.email || "your@email.com"}
            </p>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-100 px-4 py-3 rounded-xl">
            {error}
          </p>
        )}

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {Object.keys(formData).map((field) => (
            <div key={field} className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">
                {fieldLabels[field]}
              </label>

              <input
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={fieldLabels[field]}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition shadow-sm"
              />
            </div>
          ))}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-pink-500 shadow-lg hover:scale-[1.03] hover:shadow-xl transition duration-300 disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Profile;