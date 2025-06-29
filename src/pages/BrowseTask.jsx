import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router";
import { useDarkMode } from "../context/DarkModeContext";

const categoryLabels = {
  "web-development": "Web Development",
  "mobile-development": "Mobile Development",
  design: "Design",
  writing: "Writing",
  marketing: "Marketing",
  "data-science": "Data Science",
  other: "Other",
};

const BrowseTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("default");
  const [search, setSearch] = useState("");
  const location = useLocation();
  const categoryRefs = useRef({});
  const Server_Address = import.meta.env.VITE_API_ADDRESS;
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${Server_Address}/tasks`);
        const data = await res.json();
        if (data.success) {
          setTasks(data.tasks);
        } else {
          throw new Error(data.message || "Failed to fetch tasks");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter((task) => {
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return (
        (task.title && task.title.toLowerCase().includes(q)) ||
        (task.description && task.description.toLowerCase().includes(q))
      );
    });

  // Sort if not default
  const sortedTasks = sortOrder === "default"
    ? filteredTasks
    : [...filteredTasks].sort((a, b) => {
        if (sortOrder === "newest") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        } else {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
      });

  // Group filtered tasks by category
  const tasksByCategory = filteredTasks.reduce((acc, task) => {
    const cat = task.category || "other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(task);
    return acc;
  }, {});

  // Scroll to category if hash is present
  useEffect(() => {
    if (location.hash) {
      const cat = location.hash.replace("#", "");
      setTimeout(() => {
        if (categoryRefs.current[cat]) {
          const y =
            categoryRefs.current[cat].getBoundingClientRect().top +
            window.scrollY -
            80; // 80px offset
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100); // wait for render
    }
  }, [location.hash, tasks]);

  return (
    <div
      className={`min-h-[80vh] p-4 ${
        isDarkMode
          ? "bg-slate-900 text-white"
          : "bg-gradient-to-br from-slate-50 to-emerald-100 text-slate-900"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h1
          className={`text-3xl font-bold mb-8 text-center ${
            isDarkMode ? "text-emerald-400" : "text-emerald-700"
          }`}
        >
          Browse All Tasks
        </h1>
        {/* Search and Sort Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-center gap-4 mb-6 w-full">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto justify-center items-center">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className={`w-full md:w-80 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                isDarkMode
                  ? "bg-slate-900 border-slate-700 text-white placeholder-slate-400"
                  : "bg-white border-slate-200 text-slate-900"
              }`}
            />
            <div className="flex items-center gap-2">
              <label htmlFor="sortOrder" className="font-medium text-sm">
                View:
              </label>
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value)}
                className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                  isDarkMode
                    ? "bg-slate-900 border-slate-700 text-white"
                    : "bg-white border-slate-200 text-slate-900"
                }`}
              >
                <option value="default">View by Category</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>
        {loading ? (
          <div
            className={`text-center font-semibold ${
              isDarkMode ? "text-emerald-400" : "text-emerald-600"
            }`}
          >
            Loading...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 font-semibold">{error}</div>
        ) : (
          sortOrder === "default" && search.trim() === "" ? (
            Object.keys(categoryLabels).map((cat) =>
              tasksByCategory[cat] && tasksByCategory[cat].length > 0 ? (
                <div
                  key={cat}
                  ref={(el) => (categoryRefs.current[cat] = el)}
                  id={cat}
                  className="mb-10"
                >
                  <h2
                    className={`text-2xl font-bold mb-4 border-l-4 border-emerald-500 pl-3 ${
                      isDarkMode ? "text-slate-200" : "text-slate-800"
                    }`}
                  >
                    {categoryLabels[cat]}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {tasksByCategory[cat].map((task) => (
                      <div
                        key={task._id}
                        className={`rounded-xl shadow-lg p-4 flex flex-col justify-between hover:shadow-xl transition-all duration-300 ${
                          isDarkMode
                            ? "bg-slate-800 border-slate-700 hover:bg-slate-750"
                            : "bg-white border-slate-100 hover:bg-slate-50"
                        } border`}
                      >
                        <div className="space-y-4">
                          <div>
                            <div
                              className={`text-lg font-bold mb-0.5 line-clamp-1 ${
                                isDarkMode ? "text-emerald-400" : "text-emerald-700"
                              }`}
                            >
                              {task.title}
                            </div>
                            <div
                              className={`px-1.5 py-0.5 rounded-full text-xs font-medium inline-block mb-1 ${
                                isDarkMode
                                  ? "bg-emerald-900/50 text-emerald-300"
                                  : "bg-emerald-100 text-emerald-700"
                              }`}
                            >
                              {categoryLabels[task.category] || "Other"}
                            </div>
                          </div>
                          <div
                            className={`text-sm leading-relaxed line-clamp-1 mb-1 ${
                              isDarkMode ? "text-slate-300" : "text-slate-600"
                            }`}
                          >
                            {task.description}
                          </div>
                          <div
                            className={`pt-2 border-t ${
                              isDarkMode ? "border-slate-700" : "border-slate-200"
                            }`}
                          >
                            <div className="grid grid-cols-2 gap-2">
                              <div
                                className={`flex flex-col ${
                                  isDarkMode ? "text-slate-400" : "text-slate-500"
                                }`}
                              >
                                <span className="text-xs font-medium mb-0.5">Budget</span>
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
                                <span className="text-xs font-medium mb-0.5">
                                  Deadline
                                </span>
                                <span className="font-medium">{task.deadline}</span>
                              </div>
                            </div>
                            <div
                              className={`mt-2 flex items-center justify-between pt-2 border-t ${
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
                                className={`px-3 py-1.5 rounded-lg font-semibold text-sm transition-all duration-300 ${
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
                </div>
              ) : null
            )
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedTasks.map((task) => (
                <div
                  key={task._id}
                  className={`rounded-xl shadow-lg p-4 flex flex-col justify-between hover:shadow-xl transition-all duration-300 ${
                    isDarkMode
                      ? "bg-slate-800 border-slate-700 hover:bg-slate-750"
                      : "bg-white border-slate-100 hover:bg-slate-50"
                  } border`}
                >
                  <div className="space-y-4">
                    <div>
                      <div
                        className={`text-lg font-bold mb-0.5 line-clamp-1 ${
                          isDarkMode ? "text-emerald-400" : "text-emerald-700"
                        }`}
                      >
                        {task.title}
                      </div>
                      <div
                        className={`px-1.5 py-0.5 rounded-full text-xs font-medium inline-block mb-1 ${
                          isDarkMode
                            ? "bg-emerald-900/50 text-emerald-300"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {categoryLabels[task.category] || "Other"}
                      </div>
                    </div>
                    <div
                      className={`text-sm leading-relaxed line-clamp-1 mb-1 ${
                        isDarkMode ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      {task.description}
                    </div>
                    <div
                      className={`pt-2 border-t ${
                        isDarkMode ? "border-slate-700" : "border-slate-200"
                      }`}
                    >
                      <div className="grid grid-cols-2 gap-2">
                        <div
                          className={`flex flex-col ${
                            isDarkMode ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          <span className="text-xs font-medium mb-0.5">Budget</span>
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
                          <span className="text-xs font-medium mb-0.5">
                            Deadline
                          </span>
                          <span className="font-medium">{task.deadline}</span>
                        </div>
                      </div>
                      <div
                        className={`mt-2 flex items-center justify-between pt-2 border-t ${
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
                          className={`px-3 py-1.5 rounded-lg font-semibold text-sm transition-all duration-300 ${
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
          )
        )}
      </div>
    </div>
  );
};

export default BrowseTask;
