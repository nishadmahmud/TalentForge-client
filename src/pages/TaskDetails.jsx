import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../auth/AuthProvider";
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

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidForm, setBidForm] = useState({
    name: "",
    email: "",
    amount: "",
    message: "",
  });
  const [bidding, setBidding] = useState(false);
  const Server_Address = import.meta.env.VITE_API_ADDRESS;
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${Server_Address}/tasks/${id}`);
        if (!res.ok) throw new Error("Task not found");
        const data = await res.json();
        setTask(data.task || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTask();
  }, [id]);

  useEffect(() => {
    if (showBidModal && user) {
      setBidForm((prev) => ({
        ...prev,
        name: user.displayName || "",
        email: user.email || "",
      }));
    }
  }, [showBidModal, user]);

  const handleBidChange = (e) => {
    const { name, value } = e.target;
    setBidForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    setBidding(true);
    try {
      const res = await fetch(`${Server_Address}/tasks/${id}/bid`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bidForm),
      });
      const data = await res.json();
      if (data.success) {
        setTask((prev) => ({ ...prev, bidCount: (prev.bidCount ?? 0) + 1 }));
        setShowBidModal(false);
        setBidForm({
          name: user?.displayName || "",
          email: user?.email || "",
          amount: "",
          message: "",
        });
        toast.success("Bid placed successfully!", {
          duration: 2000,
          position: "top-center",
          style: { background: "#10B981", color: "#fff" },
        });
      } else {
        throw new Error(data.message || "Failed to place bid.");
      }
    } catch (error) {
      toast.error(error.message || "Failed to place bid.", {
        duration: 2000,
        position: "top-center",
        style: { background: "#EF4444", color: "#fff" },
      });
    } finally {
      setBidding(false);
    }
  };

  return (
    <div
      className={`min-h-[80vh] flex justify-center items-center p-4 ${
        isDarkMode
          ? "bg-slate-900 text-white"
          : "bg-gradient-to-br from-slate-50 to-emerald-100 text-slate-900"
      }`}
    >
      <div
        className={`max-w-2xl w-full rounded-2xl shadow-xl border p-8 ${
          isDarkMode
            ? "bg-slate-800 border-slate-700"
            : "bg-white border-slate-100"
        }`}
      >
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
        ) : !task ? (
          <div
            className={`text-center ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Task not found.
          </div>
        ) : (
          <>
            <div
              className={`mb-2 font-semibold text-base text-center ${
                isDarkMode ? "text-emerald-400" : "text-emerald-700"
              }`}
            >
              You bid for {task.bidCount ?? 0} opportunities.
            </div>
            <button
              className={`mb-4 hover:underline text-sm ${
                isDarkMode ? "text-emerald-400" : "text-emerald-600"
              }`}
              onClick={() => navigate(-1)}
            >
              &larr; Back
            </button>
            <h1
              className={`text-3xl font-bold mb-2 ${
                isDarkMode ? "text-emerald-400" : "text-emerald-700"
              }`}
            >
              {task.title}
            </h1>
            <div className="mb-4 flex flex-wrap gap-2">
              <span
                className={`inline-block px-2 py-1 rounded ${
                  isDarkMode
                    ? "bg-emerald-900/50 text-emerald-300"
                    : "bg-emerald-50 text-emerald-700"
                }`}
              >
                {categoryLabels[task.category] || task.category || "Other"}
              </span>
              <span
                className={`inline-block px-2 py-1 rounded ${
                  isDarkMode
                    ? "bg-slate-700 text-slate-300"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                Budget:{" "}
                <span
                  className={`font-semibold ${
                    isDarkMode ? "text-emerald-400" : "text-emerald-600"
                  }`}
                >
                  ${task.budget}
                </span>
              </span>
              <span
                className={`inline-block px-2 py-1 rounded ${
                  isDarkMode
                    ? "bg-slate-700 text-slate-300"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                Deadline: {task.deadline}
              </span>
              <span
                className={`inline-block px-2 py-1 rounded ${
                  isDarkMode
                    ? "bg-slate-700 text-slate-300"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                Bids: {task.bidCount ?? 0}
              </span>
            </div>
            <div className="mb-6">
              <h2
                className={`text-lg font-semibold mb-1 ${
                  isDarkMode ? "text-slate-200" : "text-slate-800"
                }`}
              >
                Description
              </h2>
              <p
                className={`${
                  isDarkMode ? "text-slate-300" : "text-slate-700"
                } whitespace-pre-line`}
              >
                {task.description}
              </p>
            </div>
            <div className="mb-6">
              <h2
                className={`text-lg font-semibold mb-1 ${
                  isDarkMode ? "text-slate-200" : "text-slate-800"
                }`}
              >
                Posted By
              </h2>
              <div className={isDarkMode ? "text-slate-300" : "text-slate-700"}>
                <span className="font-semibold">Name:</span>{" "}
                {task.userName || "N/A"}
                <br />
                <span className="font-semibold">Email:</span>{" "}
                {task.userEmail || "N/A"}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  isDarkMode
                    ? "bg-emerald-600 text-white hover:bg-emerald-500"
                    : "bg-emerald-500 text-white hover:bg-emerald-600"
                }`}
                onClick={() => setShowBidModal(true)}
              >
                Place a Bid
              </button>
            </div>
          </>
        )}
      </div>
      {/* Bid Modal */}
      {showBidModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div
            className={`rounded-xl shadow-lg p-6 w-full max-w-md relative ${
              isDarkMode ? "bg-slate-800 border border-slate-700" : "bg-white"
            }`}
          >
            <button
              className={`absolute top-2 right-2 text-xl font-bold ${
                isDarkMode
                  ? "text-slate-400 hover:text-red-400"
                  : "text-slate-400 hover:text-red-500"
              }`}
              onClick={() => setShowBidModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2
              className={`text-xl font-bold mb-4 ${
                isDarkMode ? "text-emerald-400" : "text-emerald-700"
              }`}
            >
              Place a Bid
            </h2>
            <form onSubmit={handleBidSubmit} className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={bidForm.name}
                  readOnly
                  className={`w-full px-4 py-2 rounded-lg ${
                    isDarkMode
                      ? "bg-slate-700 border-slate-600 text-slate-300 cursor-not-allowed"
                      : "bg-slate-50 border-slate-200 cursor-not-allowed"
                  } border`}
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={bidForm.email}
                  readOnly
                  className={`w-full px-4 py-2 rounded-lg ${
                    isDarkMode
                      ? "bg-slate-700 border-slate-600 text-slate-300 cursor-not-allowed"
                      : "bg-slate-50 border-slate-200 cursor-not-allowed"
                  } border`}
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Bid Amount (USD)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={bidForm.amount}
                  onChange={handleBidChange}
                  min="1"
                  required
                  className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    isDarkMode
                      ? "bg-slate-700 border-slate-600 text-white"
                      : "bg-white border-slate-200"
                  }`}
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  value={bidForm.message}
                  onChange={handleBidChange}
                  rows="3"
                  className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    isDarkMode
                      ? "bg-slate-700 border-slate-600 text-white"
                      : "bg-white border-slate-200"
                  }`}
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    isDarkMode
                      ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                  }`}
                  onClick={() => setShowBidModal(false)}
                  disabled={bidding}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    isDarkMode
                      ? "bg-emerald-600 text-white hover:bg-emerald-500"
                      : "bg-emerald-500 text-white hover:bg-emerald-600"
                  } ${bidding ? "opacity-60 cursor-not-allowed" : ""}`}
                  disabled={bidding}
                >
                  {bidding ? "Placing..." : "Place Bid"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
