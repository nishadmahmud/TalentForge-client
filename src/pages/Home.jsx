import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FaCode, FaMobileAlt, FaPaintBrush, FaPenNib, FaBullhorn, FaChartBar, FaThLarge } from 'react-icons/fa';

const slides = [
  {
    title: 'Find Top Talent, Fast',
    desc: 'Connect with skilled freelancers for your next project. Post a task and get bids instantly!',
    cta: 'Browse Tasks',
    to: '/browse-tasks',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Grow Your Career',
    desc: 'Join as a freelancer and start bidding on exciting projects. Build your portfolio and earn more.',
    cta: 'Get Started',
    to: '/add-task',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Safe & Secure Payments',
    desc: 'We ensure secure transactions and timely payments for every completed task.',
    cta: 'Learn More',
    to: '/about',
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
  },
];

const categoryLabels = {
  "web-development": "Web Development",
  "mobile-development": "Mobile Development",
  design: "Design",
  writing: "Writing",
  marketing: "Marketing",
  "data-science": "Data Science",
  other: "Other",
};

const categoryIcons = {
  "web-development": <FaCode className="text-3xl mb-2 text-emerald-600" />,
  "mobile-development": <FaMobileAlt className="text-3xl mb-2 text-emerald-600" />,
  design: <FaPaintBrush className="text-3xl mb-2 text-emerald-600" />,
  writing: <FaPenNib className="text-3xl mb-2 text-emerald-600" />,
  marketing: <FaBullhorn className="text-3xl mb-2 text-emerald-600" />,
  "data-science": <FaChartBar className="text-3xl mb-2 text-emerald-600" />,
  other: <FaThLarge className="text-3xl mb-2 text-emerald-600" />,
};

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const Server_Address = import.meta.env.VITE_API_ADDRESS;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${Server_Address}/tasks?limit=6&sort=deadline`);
        const data = await res.json();
        if (data.success) setFeatured(data.tasks);
      } catch {}
      setLoading(false);
    };
    fetchFeatured();
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-emerald-100 min-h-[80vh]">
      {/* Slider */}
      <div className="relative w-full max-w-5xl mx-auto mt-8 rounded-2xl overflow-hidden shadow-xl h-80">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ${current === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            style={{ backgroundImage: `url(${slide.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="bg-black/50 w-full h-full flex flex-col justify-center items-center p-12 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">{slide.title}</h2>
              <p className="text-lg md:text-xl text-white mb-6 drop-shadow">{slide.desc}</p>
              <Link to={slide.to} className="inline-block px-6 py-3 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-all text-lg shadow">
                {slide.cta}
              </Link>
            </div>
          </div>
        ))}
        {/* Slider controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full ${current === idx ? 'bg-emerald-500' : 'bg-white/70'} border border-emerald-500`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Featured Tasks */}
      <div className="max-w-6xl mx-auto mt-16 mb-12 px-4">
        <h2 className="text-2xl font-bold text-emerald-700 mb-6">Featured Tasks</h2>
        {loading ? (
          <div className="text-center text-emerald-600 font-semibold">Loading...</div>
        ) : featured.length === 0 ? (
          <div className="text-center text-slate-500">No featured tasks found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((task) => (
              <div key={task._id} className="bg-white rounded-xl shadow border border-slate-100 p-5 flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div>
                  <div className="text-lg font-bold text-emerald-700 mb-1">{task.title}</div>
                  <div className="text-slate-600 text-sm mb-2 line-clamp-2">{task.description}</div>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-500 mb-2">
                    <span>Budget: <span className="font-semibold text-emerald-600">${task.budget}</span></span>
                    <span>Deadline: {task.deadline}</span>
                    <span>Bids: {task.bidCount ?? 0}</span>
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <Link to={`/tasks/${task._id}`} className="px-4 py-2 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors text-sm">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Browse by Category Section */}
      <div className="max-w-6xl mx-auto mb-16 px-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Browse by Category</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <Link
              key={key}
              to={`/browse-tasks#${key}`}
              className="w-32 h-32 flex flex-col items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 font-semibold hover:bg-emerald-500 hover:text-white transition-colors text-base shadow group"
            >
              {categoryIcons[key]}
              <span className="text-center text-base font-semibold group-hover:text-white transition-colors">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Extra Section 1: How It Works */}
      <div className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                <span className="text-3xl text-emerald-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Post a Task</h3>
              <p className="text-slate-600">Describe your project and requirements. It's free and easy to post a task.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                <span className="text-3xl text-emerald-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Receive Bids</h3>
              <p className="text-slate-600">Freelancers will bid on your task. Review profiles, chat, and choose the best fit.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                <span className="text-3xl text-emerald-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Get It Done</h3>
              <p className="text-slate-600">Collaborate, track progress, and pay securely when the work is complete.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Extra Section 2: Why Choose Us */}
      <div className="py-12 bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Why Choose TalentForge?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
              <span className="text-emerald-600 text-3xl mb-2">🔒</span>
              <h3 className="font-semibold text-lg mb-2">Secure Payments</h3>
              <p className="text-slate-600">Your money is safe until you approve the work. We use trusted payment gateways.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
              <span className="text-emerald-600 text-3xl mb-2">🌟</span>
              <h3 className="font-semibold text-lg mb-2">Quality Freelancers</h3>
              <p className="text-slate-600">All freelancers are vetted and reviewed. Find the right talent for any job.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
              <span className="text-emerald-600 text-3xl mb-2">💬</span>
              <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
              <p className="text-slate-600">Our support team is always here to help you, day or night.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;