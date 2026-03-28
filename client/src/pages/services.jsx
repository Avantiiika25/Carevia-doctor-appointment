import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { motion } from "framer-motion";

const Services = () => {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const res = await axios.get("/services");
      setServices(res.data.data || []);
    } catch (error) {
      console.log("Error fetching services", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const serviceImages = {
  "General Checkup":
    "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg",
  "Blood Test":
    "https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg",
  "X-Ray":
    "https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg",
  "MRI Scan":
    "https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg",
  "CT Scan":
    "https://images.pexels.com/photos/8376178/pexels-photo-8376178.jpeg",
  "ECG Test":
    "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg",
  "Ultrasound":
    "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg",
  "Thyroid Test":
    "https://images.pexels.com/photos/4226769/pexels-photo-4226769.jpeg",
  "Full Body Checkup":
    "https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg",
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 px-4 sm:px-8 py-10">

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-bold mb-10 text-center text-indigo-600"
      >
        Our Medical Services
      </motion.h1>

      {/* Grid */}
      {services.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">
          No services available
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
  key={index}
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.1 }}
  viewport={{ once: true }}
  className="group bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-2xl transition duration-500 border border-gray-100"
>
  {/* 🖼 Image */}
  <div className="relative h-48 overflow-hidden">
    <img
      src={
        serviceImages[service.name] ||
        "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg"
      }
      alt={service.name}
      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

    {/* Price Badge */}
    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold text-indigo-600 shadow">
      ₹{service.price}
    </div>
  </div>

  {/* 📦 Content */}
  <div className="p-5 space-y-3">
    <h2 className="font-semibold text-lg text-gray-800 group-hover:text-indigo-600 transition">
      {service.name}
    </h2>

    <p className="text-gray-500 text-sm line-clamp-2">
      {service.description}
    </p>

    {/* ⏱ Duration + CTA */}
    <div className="flex justify-between items-center pt-2">
      <span className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
        ⏱ {service.durationInMinutes} min
      </span>

      
    </div>
  </div>
</motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;