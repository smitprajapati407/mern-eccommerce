import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white mt-16">

      {/* TOP SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold mb-3">NextCart🛒</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Discover the best products in electronics, fashion, shoes and accessories.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-yellow-400 cursor-pointer transition">Home</li>
            <li className="hover:text-yellow-400 cursor-pointer transition">Cart</li>
            <li className="hover:text-yellow-400 cursor-pointer transition">Login</li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Follow Us</h3>
          <div className="flex space-x-4">

            <div className="bg-gray-800 p-3 rounded-full hover:bg-yellow-400 hover:text-black transition cursor-pointer">
              <FaFacebookF />
            </div>

            <div className="bg-gray-800 p-3 rounded-full hover:bg-yellow-400 hover:text-black transition cursor-pointer">
              <FaInstagram />
            </div>

            <div className="bg-gray-800 p-3 rounded-full hover:bg-yellow-400 hover:text-black transition cursor-pointer">
              <FaTwitter />
            </div>

          </div>
        </div>

      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-700"></div>

      {/* BOTTOM */}
      <div className="text-center text-gray-400 text-sm py-4">
        © 2026 NextCart. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;