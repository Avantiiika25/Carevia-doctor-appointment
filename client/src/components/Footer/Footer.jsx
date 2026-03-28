import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* 🔷 Brand */}
        <div>
          <h2 className="text-2xl font-extrabold mb-4 bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
            Carevia
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            A modern healthcare platform that simplifies appointment booking 
            between patients and doctors — fast, reliable, and user-friendly.
          </p>

          {/* 🌐 Social Icons */}
          <div className="flex gap-4 mt-5">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
              <div
                key={i}
                className="p-2 bg-gray-800 rounded-full hover:bg-gradient-to-r from-indigo-500 to-pink-500 hover:text-white cursor-pointer transition duration-300 hover:scale-110"
              >
                <Icon size={16} />
              </div>
            ))}
          </div>
        </div>

        {/* 🔗 Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 relative inline-block">
            Quick Links
            <span className="absolute left-0 -bottom-1 w-10 h-[2px] bg-indigo-500"></span>
          </h3>

          <ul className="space-y-3 text-sm">
            {[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "My Appointments", path: "/appointments" },
              { name: "Book Appointment", path: "/book-appointment" },
            ].map((link, i) => (
              <li key={i}>
                <Link
                  to={link.path}
                  className="hover:text-indigo-400 transition duration-300 hover:translate-x-1 inline-block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 🛟 Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 relative inline-block">
            Support
            <span className="absolute left-0 -bottom-1 w-10 h-[2px] bg-pink-500"></span>
          </h3>

          <ul className="space-y-3 text-sm">
            {[
              "Help Center",
              "Privacy Policy",
              "Terms & Conditions",
              "Contact Us",
            ].map((item, i) => (
              <li
                key={i}
                className="hover:text-pink-400 cursor-pointer transition duration-300 hover:translate-x-1"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 📞 Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 relative inline-block">
            Contact
            <span className="absolute left-0 -bottom-1 w-10 h-[2px] bg-indigo-500"></span>
          </h3>

          <ul className="space-y-3 text-sm text-gray-400">
            <li className="hover:text-white transition">📍 Pune, Maharashtra</li>
            <li className="hover:text-white transition">📞 +91 1234567890</li>
            <li className="hover:text-white transition">
              ✉️ support@carevia@gmail.com
            </li>
          </ul>
        </div>
      </div>

      {/* 🔻 Bottom Bar */}
      <div className="border-t border-gray-800 py-5 text-center text-sm text-gray-500 bg-black/40 backdrop-blur-md">
        © {new Date().getFullYear()}{" "}
        <span className="text-indigo-400 font-medium">Carevia</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;