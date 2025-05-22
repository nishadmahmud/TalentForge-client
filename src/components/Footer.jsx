import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router';
import { useDarkMode } from '../context/DarkModeContext';

const Footer = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <footer className={`w-full py-8 px-2 ${isDarkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-slate-50 to-emerald-100'}`}>
      <div className="max-w-5xl mx-auto">
        <div className={`rounded-2xl shadow-xl border overflow-hidden ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
          {/* Gradient accent bar */}
          <div className={`h-2 w-full ${isDarkMode ? 'bg-gradient-to-r from-emerald-700 to-teal-700' : 'bg-gradient-to-r from-emerald-500 to-teal-500'}`} />
          <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/browse-tasks" className={`transition-colors ${isDarkMode ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-500 hover:text-emerald-600'}`}>Browse Tasks</Link>
                </li>
                <li>
                  <Link to="/add-task" className={`transition-colors ${isDarkMode ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-500 hover:text-emerald-600'}`}>Post a Task</Link>
                </li>
                <li>
                  <Link to="/my-tasks" className={`transition-colors ${isDarkMode ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-500 hover:text-emerald-600'}`}>My Tasks</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className={`transition-colors ${isDarkMode ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-500 hover:text-emerald-600'}`}>About us</Link>
                </li>
                <li>
                  <Link to="/contact" className={`transition-colors ${isDarkMode ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-500 hover:text-emerald-600'}`}>Contact</Link>
                </li>
                <li>
                  <Link to="/terms" className={`transition-colors ${isDarkMode ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-500 hover:text-emerald-600'}`}>Terms & Conditions</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Contact</h3>
              <ul className={`space-y-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                <li>Email: <span className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>support@talentforge.com</span></li>
                <li>Phone: <span className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>+1 234 567 890</span></li>
                <li>Address: <span className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>123 Freelance Street, Digital City</span></li>
              </ul>
            </div>
            <div>
              <h3 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Follow Us</h3>
              <div className="flex space-x-4 mb-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDarkMode ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-400 hover:text-emerald-600'}`}>
                  <FaFacebook className="h-6 w-6" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDarkMode ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-400 hover:text-emerald-600'}`}>
                  <FaTwitter className="h-6 w-6" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDarkMode ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-400 hover:text-emerald-600'}`}>
                  <FaInstagram className="h-6 w-6" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDarkMode ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-400 hover:text-emerald-600'}`}>
                  <FaLinkedin className="h-6 w-6" />
                </a>
              </div>
              <form className={`flex rounded-lg overflow-hidden border ${isDarkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-slate-50'}`}>
                <input
                  type="email"
                  placeholder="Your email"
                  className={`flex-1 px-3 py-2 bg-transparent focus:outline-none ${isDarkMode ? 'text-white placeholder-slate-400' : 'text-slate-700'}`}
                />
                <button type="submit" className={`px-4 py-2 font-semibold transition-colors ${isDarkMode ? 'bg-emerald-700 text-white hover:bg-emerald-800' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>Subscribe</button>
              </form>
            </div>
          </div>
          <div className={`border-t text-center py-4 rounded-b-2xl ${isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-100 bg-white'}`}>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>&copy; {new Date().getFullYear()} TalentForge. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;