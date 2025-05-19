import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-slate-50 to-emerald-100 py-8 px-2">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Gradient accent bar */}
          <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500 w-full" />
          <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/browse-tasks" className="text-slate-500 hover:text-emerald-600 transition-colors">Browse Tasks</Link>
                </li>
                <li>
                  <Link to="/add-task" className="text-slate-500 hover:text-emerald-600 transition-colors">Post a Task</Link>
                </li>
                <li>
                  <Link to="/my-tasks" className="text-slate-500 hover:text-emerald-600 transition-colors">My Tasks</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-slate-500 hover:text-emerald-600 transition-colors">About us</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-slate-500 hover:text-emerald-600 transition-colors">Contact</Link>
                </li>
                <li>
                  <Link to="/terms" className="text-slate-500 hover:text-emerald-600 transition-colors">Terms & Conditions</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Contact</h3>
              <ul className="space-y-2 text-slate-500">
                <li>Email: <span className="text-slate-700">support@talentforge.com</span></li>
                <li>Phone: <span className="text-slate-700">+1 234 567 890</span></li>
                <li>Address: <span className="text-slate-700">123 Freelance Street, Digital City</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Follow Us</h3>
              <div className="flex space-x-4 mb-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-600 transition-colors">
                  <FaFacebook className="h-6 w-6" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-600 transition-colors">
                  <FaTwitter className="h-6 w-6" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-600 transition-colors">
                  <FaInstagram className="h-6 w-6" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-600 transition-colors">
                  <FaLinkedin className="h-6 w-6" />
                </a>
              </div>
              <form className="flex rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-transparent focus:outline-none text-slate-700"
                />
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors">Subscribe</button>
              </form>
            </div>
          </div>
          <div className="border-t border-slate-100 text-center py-4 bg-white rounded-b-2xl">
            <p className="text-xs text-slate-400">&copy; {new Date().getFullYear()} TalentForge. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;