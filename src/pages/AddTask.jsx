import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { AuthContext } from "../auth/AuthProvider";
import toast from "react-hot-toast";
import { useDarkMode } from "../context/DarkModeContext";
import { FaRegCalendarAlt } from "react-icons/fa";

const AddTask = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    category: "",
  });

  const Server_Address = import.meta.env.VITE_API_ADDRESS;
  const { isDarkMode } = useDarkMode();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const taskData = {
        ...formData,
        userEmail: user?.email,
        userName: user?.displayName,
        userId: user?.uid,
      };

      const response = await fetch(`${Server_Address}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      const data = await response.json();

      if (data.success) {
        toast.success("Task created successfully!", {
          duration: 2000,
          position: "top-center",
          style: {
            background: "#10B981",
            color: "#fff",
          },
        });
        navigate("/my-tasks");
      } else {
        throw new Error(data.message || "Failed to create task.");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error(error.message || "Failed to create task. Please try again.", {
        duration: 2000,
        position: "top-center",
        style: {
          background: "#EF4444",
          color: "#fff",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Make default date picker icon visible in light mode */}
      <style>{`
        .light input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.4);
        }
      `}</style>
      <div
        className={`min-h-[80vh] flex justify-center items-center p-4 ${
          isDarkMode
            ? "bg-slate-900 text-white"
            : "bg-gradient-to-br from-slate-50 to-emerald-100 text-slate-900 light"
        }`}
      >
        <div className="max-w-3xl w-full">
          <motion.div
            className={`rounded-2xl shadow-xl border p-6 sm:p-8 ${
              isDarkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-slate-100"
            }`}
          >
            <h1
              className={`text-2xl font-bold mb-6 ${
                isDarkMode ? "text-emerald-400" : "text-slate-900"
              }`}
            >
              Post a New Task
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Task Title */}
              <div>
                <label
                  htmlFor="title"
                  className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  Task Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                    isDarkMode
                      ? "bg-slate-900 border-slate-700 text-white placeholder-slate-400"
                      : "bg-white border-slate-200 text-slate-900"
                  }`}
                  placeholder="Enter a clear title for your task"
                />
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                    isDarkMode
                      ? "bg-slate-900 border-slate-700 text-white"
                      : "bg-white border-slate-200 text-slate-900"
                  }`}
                >
                  <option value="">Select a category</option>
                  <option value="web-development">Web Development</option>
                  <option value="mobile-development">Mobile Development</option>
                  <option value="design">Design</option>
                  <option value="writing">Writing</option>
                  <option value="marketing">Marketing</option>
                  <option value="data-science">Data Science</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                    isDarkMode
                      ? "bg-slate-900 border-slate-700 text-white placeholder-slate-400"
                      : "bg-white border-slate-200 text-slate-900"
                  }`}
                  placeholder="Describe what needs to be done"
                />
              </div>

              {/* Deadline and Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="deadline"
                    className={`block text-sm font-medium mb-1 ${
                      isDarkMode ? "text-slate-200" : "text-slate-700"
                    }`}
                  >
                    Deadline
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    required
                    value={formData.deadline}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors appearance-none ${
                      isDarkMode
                        ? "bg-slate-900 border-slate-700 text-white"
                        : "bg-white border-slate-200 text-slate-900"
                    }`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="budget"
                    className={`block text-sm font-medium mb-1 ${
                      isDarkMode ? "text-slate-200" : "text-slate-700"
                    }`}
                  >
                    Budget (USD)
                  </label>
                  <input
                    type="number"
                    id="budget"
                    name="budget"
                    required
                    min="1"
                    value={formData.budget}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                      isDarkMode
                        ? "bg-slate-900 border-slate-700 text-white"
                        : "bg-white border-slate-200 text-slate-900"
                    }`}
                    placeholder="Enter budget"
                  />
                </div>
              </div>

              {/* Read-only User Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="userEmail"
                    className={`block text-sm font-medium mb-1 ${
                      isDarkMode ? "text-slate-200" : "text-slate-700"
                    }`}
                  >
                    User Email
                  </label>
                  <input
                    type="email"
                    id="userEmail"
                    value={user?.email || ""}
                    readOnly
                    className={`w-full px-4 py-2 border rounded-lg bg-slate-50 cursor-not-allowed ${
                      isDarkMode
                        ? "bg-slate-800 border-slate-700 text-white"
                        : "border-slate-200 text-slate-900"
                    }`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="userName"
                    className={`block text-sm font-medium mb-1 ${
                      isDarkMode ? "text-slate-200" : "text-slate-700"
                    }`}
                  >
                    User Name
                  </label>
                  <input
                    type="text"
                    id="userName"
                    value={user?.displayName || ""}
                    readOnly
                    className={`w-full px-4 py-2 border rounded-lg bg-slate-50 cursor-not-allowed ${
                      isDarkMode
                        ? "bg-slate-800 border-slate-700 text-white"
                        : "border-slate-200 text-slate-900"
                    }`}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full px-6 py-3 text-white font-medium rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-sm transition-all ${
                    loading ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Adding Task..." : "Add Task"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AddTask;
