import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// 🎨 Using same palette as Navbar
// Indigo + Pink gradient theme

const Home = () => {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-50">

      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-24 overflow-hidden">

  {/* 🔥 Background Glow Effect */}
  <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>

  <div className="relative max-w-7xl mx-auto px-6 text-center">

    {/* ✨ Heading */}
    <motion.h1
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-4xl md:text-6xl font-extrabold mb-4"
    >
      Welcome{userData?.name ? `, ${userData.name}` : ""} 👋
    </motion.h1>

    {/* Subtitle */}
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-lg md:text-xl mb-10 text-indigo-100"
    >
      Seamlessly book appointments and manage your healthcare journey.
    </motion.p>

    {/* 🔁 SCROLLING BANNER */}
    <div className="overflow-hidden rounded-2xl mb-10">
      <motion.div
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
        className="flex gap-6 w-max"
      >
        {[
           "https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg",
  "https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg",
  "https://images.pexels.com/photos/8376178/pexels-photo-8376178.jpeg",
  "https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg",
   "https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg",
  "https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg",
  "https://images.pexels.com/photos/8376178/pexels-photo-8376178.jpeg",
  "https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg",
   "https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg",
  "https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg",
  "https://images.pexels.com/photos/8376178/pexels-photo-8376178.jpeg",
  "https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg",
   "https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg",
  "https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg",
  "https://images.pexels.com/photos/8376178/pexels-photo-8376178.jpeg",
  "https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg",
        ].map((img, i) => (
          <div
            key={i}
            className="min-w-[280px] md:min-w-[350px] h-44 md:h-52 rounded-xl overflow-hidden relative group"
          >
            <img
              src={`${img}?auto=format&fit=crop&w=800&q=80`}
              alt="medical"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
        ))}
      </motion.div>
    </div>

    {/* CTA Buttons */}
    <div className="flex justify-center gap-4 flex-wrap">
      <Link
        to="/book-appointment"
        className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:bg-gray-100 transition duration-300"
      >
        Book Appointment
      </Link>

      <Link
        to="/appointments"
        className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-indigo-700 hover:scale-105 transition duration-300"
      >
        View Appointments
      </Link>
    </div>
  </div>
</section>

      {/* 💡 SERVICES SECTION */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Services
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

            {[
              {
                title: "General Consultation",
                desc: "Expert doctors for everyday health concerns.",
              },
              {
                title: "Specialist Care",
                desc: "Access top specialists across multiple domains.",
              },
              {
                title: "Online Appointments",
                desc: "Book and manage appointments anytime, anywhere.",
              },
            ].map((service, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300"
              >
                <h3 className="text-xl font-semibold mb-2 text-indigo-600">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* View All */}
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-block text-indigo-600 font-semibold hover:underline"
            >
              View all services →
            </Link>
          </div>
        </div>
      </section>

      {/* 📊 STATS SECTION */}
      <section className="bg-gradient-to-r from-indigo-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">

            {["10k+", "100+", "24/7"].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-4xl font-bold text-indigo-600">
                  {stat}
                </h3>
                <p className="text-gray-600 mt-2">
                  {i === 0
                    ? "Patients Served"
                    : i === 1
                    ? "Expert Doctors"
                    : "Support"}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
