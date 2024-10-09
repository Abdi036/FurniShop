import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Stay in touch section */}
        <div className="text-center mb-8 gap-3">
          <h2 className="text-2xl font-bold mb-2">Stay in Touch</h2>
          <p className="text-lg mb-4">
            Receive the latest updates about our products & promotions
          </p>
          <div className="flex justify-center items-center gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 w-full max-w-sm rounded-md border border-gray-600 bg-gray-900"
            />
            <button className="p-2 bg-orange-500 rounded-md hover:bg-orange-600">
              Subscribe
            </button>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Social Media</h3>
          <div className="flex justify-center gap-4">
            <a
              href="#"
              className="text-white hover:text-orange-500 hover:translate-y-[-3px]"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="#"
              className="text-white hover:text-orange-500 hover:translate-y-[-3px]"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="#"
              className="text-white hover:text-orange-500 hover:translate-y-[-3px]"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="#"
              className="text-white hover:text-orange-500 hover:translate-y-[-3px]"
            >
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
