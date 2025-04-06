import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">About Us</h2>
          <p className="text-sm">
            We are dedicated to providing the best e-commerce experience with top quality products and unbeatable support.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/products" className="hover:text-white">Products</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
          <p className="text-sm">Email: support@example.com</p>
          <p className="text-sm mb-4">Phone: +91 9876543210</p>
          <div className="flex space-x-4 mt-2">
            <a href="#"><FaFacebook className="text-lg hover:text-white" /></a>
            <a href="#"><FaTwitter className="text-lg hover:text-white" /></a>
            <a href="#"><FaInstagram className="text-lg hover:text-white" /></a>
            <a href="#"><FaLinkedin className="text-lg hover:text-white" /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        <p>&copy; 2024 YourCompany. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
