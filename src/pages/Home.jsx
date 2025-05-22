import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  FaCode,
  FaMobileAlt,
  FaPaintBrush,
  FaPenNib,
  FaBullhorn,
  FaChartBar,
  FaThLarge,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { useDarkMode } from "../context/DarkModeContext";
import { Typewriter } from "react-simple-typewriter";

const slides = [
  {
    title: "Find Top Talent, Fast",
    desc: "Connect with skilled freelancers for your next project. Post a task and get bids instantly!",
    cta: "Browse Tasks",
    to: "/browse-tasks",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Grow Your Career",
    desc: "Join as a freelancer and start bidding on exciting projects. Build your portfolio and earn more.",
    cta: "Get Started",
    to: "/add-task",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Safe & Secure Payments",
    desc: "We ensure secure transactions and timely payments for every completed task.",
    cta: "Learn More",
    to: "/about",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
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
  "mobile-development": (
    <FaMobileAlt className="text-3xl mb-2 text-emerald-600" />
  ),
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
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const Server_Address = import.meta.env.VITE_API_ADDRESS;

  // Slider timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Fetch featured tasks effect
  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${Server_Address}/tasks?limit=20`); // fetch more to sort/filter
        const data = await res.json();
        if (data.success) {
          // Sort by deadline ascending (soonest first)
          const sorted = data.tasks
            .filter((task) => !!task.deadline)
            .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
            .slice(0, 6);
          setFeatured(sorted);
        }
      } catch (error) {
        console.error("Error fetching featured tasks:", error);
      }
      setLoading(false);
    };
    fetchFeatured();
  }, [Server_Address]);

  return (
    <div
      className={`min-h-[80vh] ${
        isDarkMode
          ? "bg-slate-900 text-white"
          : "bg-gradient-to-br from-slate-50 to-emerald-100"
      }`}
    >
      <div className="h-10" />
      {/* Slider */}
      <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl h-80">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ${
              current === idx ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{
              backgroundImage: `url(${slide.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="bg-black/50 w-full h-full flex flex-col justify-center items-center p-12 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                {current === idx ? (
                  <Typewriter
                    words={[slide.title]}
                    loop={false}
                    cursor
                    cursorStyle="|"
                    typeSpeed={60}
                    deleteSpeed={40}
                    delaySpeed={1500}
                  />
                ) : (
                  slide.title
                )}
              </h2>
              <p className="text-lg md:text-xl text-white mb-6 drop-shadow">
                {slide.desc}
              </p>
              <Link
                to={slide.to}
                className="inline-block px-6 py-3 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-all text-lg shadow"
              >
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
              className={`w-3 h-3 rounded-full ${
                current === idx ? "bg-emerald-500" : "bg-white/70"
              } border border-emerald-500`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Featured Tasks */}
      <div className="max-w-6xl mx-auto mt-16 mb-12 px-4">
        <h2
          className={`text-2xl font-bold mb-6 ${
            isDarkMode ? "text-emerald-400" : "text-emerald-700"
          }`}
        >
          Featured Tasks
        </h2>
        {loading ? (
          <div
            className={`text-center font-semibold ${
              isDarkMode ? "text-emerald-400" : "text-emerald-600"
            }`}
          >
            Loading...
          </div>
        ) : featured.length === 0 ? (
          <div
            className={`text-center ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            No featured tasks found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((task) => (
              <div
                key={task._id}
                className={`rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 ${
                  isDarkMode
                    ? "bg-slate-800 border-slate-700 hover:bg-slate-750"
                    : "bg-white border-slate-100 hover:bg-slate-50"
                } border`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div
                      className={`text-lg font-bold mb-1 line-clamp-1 ${
                        isDarkMode ? "text-emerald-400" : "text-emerald-700"
                      }`}
                    >
                      {task.title}
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium shrink-0 ml-2 ${
                        isDarkMode
                          ? "bg-emerald-900/50 text-emerald-300"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {categoryLabels[task.category] || "Other"}
                    </div>
                  </div>

                  <div
                    className={`text-sm leading-relaxed line-clamp-1 ${
                      isDarkMode ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {task.description}
                  </div>

                  <div
                    className={`pt-3 border-t ${
                      isDarkMode ? "border-slate-700" : "border-slate-200"
                    }`}
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <div
                        className={`flex flex-col ${
                          isDarkMode ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        <span className="text-xs font-medium mb-1">Budget</span>
                        <span
                          className={`font-semibold ${
                            isDarkMode ? "text-emerald-400" : "text-emerald-600"
                          }`}
                        >
                          ${task.budget}
                        </span>
                      </div>
                      <div
                        className={`flex flex-col ${
                          isDarkMode ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        <span className="text-xs font-medium mb-1">
                          Deadline
                        </span>
                        <span className="font-medium">{task.deadline}</span>
                      </div>
                    </div>

                    <div
                      className={`mt-3 flex items-center justify-between pt-3 border-t ${
                        isDarkMode ? "border-slate-700" : "border-slate-200"
                      }`}
                    >
                      <div
                        className={`flex items-center space-x-1 ${
                          isDarkMode ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                          />
                        </svg>
                        <span className="text-sm">
                          {task.bidCount ?? 0} bids
                        </span>
                      </div>
                      <Link
                        to={`/tasks/${task._id}`}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                          isDarkMode
                            ? "bg-emerald-600 text-white hover:bg-emerald-500"
                            : "bg-emerald-500 text-white hover:bg-emerald-600"
                        }`}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Browse by Category Section */}
      <div className="max-w-6xl mx-auto mb-16 px-4">
        <h2
          className={`text-2xl font-bold mb-6 ${
            isDarkMode ? "text-slate-200" : "text-slate-800"
          }`}
        >
          Browse by Category
        </h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <Link
              key={key}
              to={`/browse-tasks#${key}`}
              className={`w-32 h-32 flex flex-col items-center justify-center rounded-xl font-semibold hover:bg-emerald-500 hover:text-white transition-colors text-base shadow group ${
                isDarkMode
                  ? "bg-emerald-900 text-emerald-300"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {categoryIcons[key]}
              <span className="text-center text-base font-semibold group-hover:text-white transition-colors">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Extra Section 1: How It Works */}
      <div className={`py-12 ${isDarkMode ? "bg-slate-800" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto px-4">
          <h2
            className={`text-2xl font-bold mb-8 text-center ${
              isDarkMode ? "text-slate-200" : "text-slate-800"
            }`}
          >
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  isDarkMode ? "bg-emerald-900" : "bg-emerald-100"
                }`}
              >
                <span
                  className={`text-3xl font-bold ${
                    isDarkMode ? "text-emerald-400" : "text-emerald-600"
                  }`}
                >
                  1
                </span>
              </div>
              <h3
                className={`font-semibold text-lg mb-2 ${
                  isDarkMode ? "text-slate-200" : ""
                }`}
              >
                Post a Task
              </h3>
              <p className={isDarkMode ? "text-slate-400" : "text-slate-600"}>
                Describe your project and requirements. It's free and easy to
                post a task.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  isDarkMode ? "bg-emerald-900" : "bg-emerald-100"
                }`}
              >
                <span
                  className={`text-3xl font-bold ${
                    isDarkMode ? "text-emerald-400" : "text-emerald-600"
                  }`}
                >
                  2
                </span>
              </div>
              <h3
                className={`font-semibold text-lg mb-2 ${
                  isDarkMode ? "text-slate-200" : ""
                }`}
              >
                Receive Bids
              </h3>
              <p className={isDarkMode ? "text-slate-400" : "text-slate-600"}>
                Freelancers will bid on your task. Review profiles, chat, and
                choose the best fit.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  isDarkMode ? "bg-emerald-900" : "bg-emerald-100"
                }`}
              >
                <span
                  className={`text-3xl font-bold ${
                    isDarkMode ? "text-emerald-400" : "text-emerald-600"
                  }`}
                >
                  3
                </span>
              </div>
              <h3
                className={`font-semibold text-lg mb-2 ${
                  isDarkMode ? "text-slate-200" : ""
                }`}
              >
                Get It Done
              </h3>
              <p className={isDarkMode ? "text-slate-400" : "text-slate-600"}>
                Collaborate, track progress, and pay securely when the work is
                complete.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Extra Section 2: Why Choose Us */}
      <div
        className={`py-12 ${
          isDarkMode
            ? "bg-gradient-to-r from-emerald-900 to-teal-900"
            : "bg-gradient-to-r from-emerald-50 to-teal-50"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2
            className={`text-2xl font-bold mb-8 text-center ${
              isDarkMode ? "text-slate-200" : "text-slate-800"
            }`}
          >
            Why Choose TalentForge?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className={`rounded-xl shadow p-6 flex flex-col items-center text-center ${
                isDarkMode ? "bg-slate-800" : "bg-white"
              }`}
            >
              <span
                className={`text-3xl mb-2 ${
                  isDarkMode ? "text-emerald-400" : "text-emerald-600"
                }`}
              >
                🔒
              </span>
              <h3
                className={`font-semibold text-lg mb-2 ${
                  isDarkMode ? "text-slate-200" : ""
                }`}
              >
                Secure Payments
              </h3>
              <p className={isDarkMode ? "text-slate-400" : "text-slate-600"}>
                Your money is safe until you approve the work. We use trusted
                payment gateways.
              </p>
            </div>
            <div
              className={`rounded-xl shadow p-6 flex flex-col items-center text-center ${
                isDarkMode ? "bg-slate-800" : "bg-white"
              }`}
            >
              <span
                className={`text-3xl mb-2 ${
                  isDarkMode ? "text-emerald-400" : "text-emerald-600"
                }`}
              >
                🌟
              </span>
              <h3
                className={`font-semibold text-lg mb-2 ${
                  isDarkMode ? "text-slate-200" : ""
                }`}
              >
                Quality Freelancers
              </h3>
              <p className={isDarkMode ? "text-slate-400" : "text-slate-600"}>
                All freelancers are vetted and reviewed. Find the right talent
                for any job.
              </p>
            </div>
            <div
              className={`rounded-xl shadow p-6 flex flex-col items-center text-center ${
                isDarkMode ? "bg-slate-800" : "bg-white"
              }`}
            >
              <span
                className={`text-3xl mb-2 ${
                  isDarkMode ? "text-emerald-400" : "text-emerald-600"
                }`}
              >
                💬
              </span>
              <h3
                className={`font-semibold text-lg mb-2 ${
                  isDarkMode ? "text-slate-200" : ""
                }`}
              >
                24/7 Support
              </h3>
              <p className={isDarkMode ? "text-slate-400" : "text-slate-600"}>
                Our support team is always here to help you, day or night.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
