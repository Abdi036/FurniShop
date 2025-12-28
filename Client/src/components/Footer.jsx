import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12 border-t-4 border-gold">
      <div className="container mx-auto px-4">
        {/* Stay in touch section */}
        <div className="text-center mb-12 gap-3">
          <h2 className="text-3xl font-serif font-bold mb-4 text-gold">
            Stay in Touch
          </h2>
          <p className="text-lg mb-6 font-light text-gray-300">
            Receive the latest updates about our exclusive collections &
            promotions
          </p>
          <div className="flex justify-center items-center gap-0 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="p-3 w-full rounded-l-md border border-gold bg-primary-light text-white focus:outline-none focus:ring-1 focus:ring-gold placeholder-gray-500"
            />
            <button className="p-3 bg-gold text-primary font-bold uppercase tracking-wider rounded-r-md hover:bg-white transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="text-center">
          <h3 className="text-lg font-serif font-semibold mb-6 text-gold">
            Follow Us
          </h3>
          <div className="flex justify-center gap-6">
            <a
              href="#"
              className="text-gray-400 hover:text-gold transition-all duration-300 transform hover:-translate-y-1"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gold transition-all duration-300 transform hover:-translate-y-1"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gold transition-all duration-300 transform hover:-translate-y-1"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gold transition-all duration-300 transform hover:-translate-y-1"
            >
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm font-light">
            &copy; 2024 FurniShop. All Rights Reserved.{" "}
            <span className="text-gold">Designed for Excellence.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
