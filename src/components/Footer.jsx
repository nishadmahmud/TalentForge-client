import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Services</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/browse-tasks" className="text-base text-gray-500 hover:text-gray-900">
                  Browse Tasks
                </Link>
              </li>
              <li>
                <Link to="/add-task" className="text-base text-gray-500 hover:text-gray-900">
                  Post a Task
                </Link>
              </li>
              <li>
                <Link to="/my-tasks" className="text-base text-gray-500 hover:text-gray-900">
                  My Tasks
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-base text-gray-500 hover:text-gray-900">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-gray-500 hover:text-gray-900">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-base text-gray-500 hover:text-gray-900">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-4">
              <li className="text-base text-gray-500">Email: support@freelancehub.com</li>
              <li className="text-base text-gray-500">Phone: +1 234 567 890</li>
              <li className="text-base text-gray-500">Address: 123 Freelance Street, Digital City</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Newsletter</h3>
            <div className="mt-4">
              <div className="flex rounded-md shadow-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="mt-6 flex space-x-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            Copyright © 2024 - All rights reserved by FreelanceHub
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;