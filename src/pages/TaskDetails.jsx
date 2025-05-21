import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../auth/AuthProvider";

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
  const [bidForm, setBidForm] = useState({ name: "", email: "", amount: "", message: "" });
  const [bidding, setBidding] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:3000/tasks/${id}`);
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
      const res = await fetch(`http://localhost:3000/tasks/${id}/bid`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bidForm),
      });
      const data = await res.json();
      if (data.success) {
        setTask((prev) => ({ ...prev, bidCount: (prev.bidCount ?? 0) + 1 }));
        setShowBidModal(false);
        setBidForm({ name: user?.displayName || "", email: user?.email || "", amount: "", message: "" });
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
    <div className="min-h-[80vh] flex justify-center items-center bg-gradient-to-br from-slate-50 to-emerald-100 p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
        {loading ? (
          <div className="text-center text-emerald-600 font-semibold">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 font-semibold">{error}</div>
        ) : !task ? (
          <div className="text-center text-slate-500">Task not found.</div>
        ) : (
          <>
            <div className="mb-2 text-emerald-700 font-semibold text-base text-center">
              You bid for {task.bidCount ?? 0} opportunities.
            </div>
            <button
              className="mb-4 text-emerald-600 hover:underline text-sm"
              onClick={() => navigate(-1)}
            >
              &larr; Back
            </button>
            <h1 className="text-3xl font-bold text-emerald-700 mb-2">{task.title}</h1>
            <div className="mb-4 text-slate-600 text-sm">
              <span className="inline-block mr-2 px-2 py-1 bg-emerald-50 text-emerald-700 rounded">
                {categoryLabels[task.category] || task.category || "Other"}
              </span>
              <span className="inline-block mr-2 px-2 py-1 bg-slate-100 text-slate-700 rounded">
                Budget: <span className="font-semibold text-emerald-600">${task.budget}</span>
              </span>
              <span className="inline-block mr-2 px-2 py-1 bg-slate-100 text-slate-700 rounded">
                Deadline: {task.deadline}
              </span>
              <span className="inline-block px-2 py-1 bg-slate-100 text-slate-700 rounded">
                Bids: {task.bidCount ?? 0}
              </span>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-1">Description</h2>
              <p className="text-slate-700 whitespace-pre-line">{task.description}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-1">Posted By</h2>
              <div className="text-slate-700">
                <span className="font-semibold">Name:</span> {task.userName || "N/A"}
                <br />
                <span className="font-semibold">Email:</span> {task.userEmail || "N/A"}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                className="px-6 py-2 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-slate-400 hover:text-red-500 text-xl font-bold"
              onClick={() => setShowBidModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-emerald-700">Place a Bid</h2>
            <form onSubmit={handleBidSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={bidForm.name}
                  readOnly
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={bidForm.email}
                  readOnly
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Bid Amount (USD)</label>
                <input
                  type="number"
                  name="amount"
                  value={bidForm.amount}
                  onChange={handleBidChange}
                  min="1"
                  required
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea
                  name="message"
                  value={bidForm.message}
                  onChange={handleBidChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-slate-200 text-slate-700 font-semibold hover:bg-slate-300"
                  onClick={() => setShowBidModal(false)}
                  disabled={bidding}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-6 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors ${bidding ? "opacity-60 cursor-not-allowed" : ""}`}
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