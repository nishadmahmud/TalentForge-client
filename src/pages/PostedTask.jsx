import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useDarkMode } from '../context/DarkModeContext';

const initialEditState = {
  _id: "",
  title: "",
  category: "",
  budget: "",
  deadline: "",
  description: "",
};

const PostedTask = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(initialEditState);
  const [updating, setUpdating] = useState(false);
  const [showBidsModal, setShowBidsModal] = useState(false);
  const [bidsTask, setBidsTask] = useState(null);
  const { isDarkMode } = useDarkMode();

  const Server_Address = import.meta.env.VITE_API_ADDRESS;

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${Server_Address}/my-tasks?email=${encodeURIComponent(
            user?.email
          )}`
        );
        const data = await res.json();
        if (data.success) {
          setTasks(data.tasks);
        } else {
          throw new Error(data.message || "Failed to fetch tasks");
        }
      } catch (err) {
        setError(err.message);
        toast.error(err.message || "Failed to fetch tasks", { duration: 2000 });
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) fetchTasks();
  }, [user?.email]);

  const handleUpdate = (task) => {
    setEditTask(task);
    setShowModal(true);
  };
  const handleDelete = async (taskId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this task!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (!result.isConfirmed) return;
    try {
      const res = await fetch(`${Server_Address}/tasks/${taskId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
        toast.success("Task deleted successfully!", {
          duration: 2000,
          position: "top-center",
          style: {
            background: "#10B981",
            color: "#fff",
          },
        });
      } else {
        throw new Error(data.message || "Failed to delete task.");
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete task.", {
        duration: 2000,
        position: "top-center",
        style: {
          background: "#EF4444",
          color: "#fff",
        },
      });
    }
  };
  const handleBids = (taskId) => {
    const task = tasks.find((t) => t._id === taskId);
    setBidsTask(task);
    setShowBidsModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await fetch(`${Server_Address}/${editTask._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTask.title,
          category: editTask.category,
          budget: editTask.budget,
          deadline: editTask.deadline,
          description: editTask.description,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === editTask._id ? { ...task, ...editTask } : task
          )
        );
        setShowModal(false);
        toast.success("Task updated successfully!", {
          duration: 2000,
          position: "top-center",
          style: {
            background: "#10B981",
            color: "#fff",
          },
        });
      } else {
        throw new Error(data.message || "Failed to update task.");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update task.", {
        duration: 2000,
        position: "top-center",
        style: {
          background: "#EF4444",
          color: "#fff",
        },
      });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className={`min-h-[80vh] flex justify-center items-center p-4 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-gradient-to-br from-slate-50 to-emerald-100 text-slate-900'}`}>
      <div className={`max-w-5xl w-full rounded-2xl shadow-xl border p-6 sm:p-8 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
        <h1 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-emerald-400' : 'text-slate-900'}`}>My Posted Tasks</h1>
        {loading ? (
          <div className="text-center text-emerald-600 font-semibold">
            Loading...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 font-semibold">{error}</div>
        ) : tasks.length === 0 ? (
          <div className="text-center text-slate-500">
            You have not posted any tasks yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className={`min-w-full divide-y ${isDarkMode ? 'divide-slate-700' : 'divide-slate-200'}`}>
              <thead className={isDarkMode ? 'bg-slate-700' : 'bg-slate-50'}>
                <tr>
                  <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>Title</th>
                  <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>Category</th>
                  <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>Budget</th>
                  <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>Deadline</th>
                  <th className={`px-4 py-2 text-center text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>Actions</th>
                </tr>
              </thead>
              <tbody className={`${isDarkMode ? 'bg-slate-800 divide-y divide-slate-700' : 'bg-white divide-y divide-slate-100'}`}>
                {tasks.map((task) => (
                  <tr key={task._id}>
                    <td className={`px-4 py-3 font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                      {task.title}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {task.category}
                    </td>
                    <td className="px-4 py-3 text-emerald-700 font-bold">
                      ${task.budget}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {task.deadline}
                    </td>
                    <td className="px-4 py-3 flex flex-col sm:flex-row gap-2 justify-center items-center">
                      <button
                        onClick={() => handleUpdate(task)}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs font-semibold"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-semibold"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleBids(task._id)}
                        className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded text-xs font-semibold"
                      >
                        Bids
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Modal for editing task */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className={`rounded-xl shadow-lg w-full max-w-lg relative ${isDarkMode ? 'bg-slate-800 border border-slate-700 text-white' : 'bg-white'}`}>
            <div className="max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <button
                  className="absolute top-2 right-2 text-slate-400 hover:text-red-500 text-xl font-bold"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Update Task</h2>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  {/* User Information - Read Only */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>User Email</label>
                      <input
                        type="email"
                        value={user?.email || ""}
                        readOnly
                        className={`w-full px-4 py-2 border rounded-lg bg-slate-50 cursor-not-allowed ${
                          isDarkMode 
                            ? 'bg-slate-800 border-slate-700 text-white' 
                            : 'border-slate-200 text-slate-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>User Name</label>
                      <input
                        type="text"
                        value={user?.displayName || ""}
                        readOnly
                        className={`w-full px-4 py-2 border rounded-lg bg-slate-50 cursor-not-allowed ${
                          isDarkMode 
                            ? 'bg-slate-800 border-slate-700 text-white' 
                            : 'border-slate-200 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Title</label>
                    <input
                      type="text"
                      name="title"
                      value={editTask.title}
                      onChange={handleEditChange}
                      required
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-400' : 'bg-white border-slate-200 text-slate-900'}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Category</label>
                    <select
                      name="category"
                      value={editTask.category}
                      onChange={handleEditChange}
                      required
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
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
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Budget (USD)</label>
                    <input
                      type="number"
                      name="budget"
                      value={editTask.budget}
                      onChange={handleEditChange}
                      min="1"
                      required
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Deadline</label>
                    <input
                      type="date"
                      name="deadline"
                      value={editTask.deadline}
                      onChange={handleEditChange}
                      required
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Description</label>
                    <textarea
                      name="description"
                      value={editTask.description}
                      onChange={handleEditChange}
                      rows="3"
                      required
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-400' : 'bg-white border-slate-200 text-slate-900'}`}
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${isDarkMode ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
                      onClick={() => setShowModal(false)}
                      disabled={updating}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={`px-6 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors ${updating ? 'opacity-60 cursor-not-allowed' : ''}`}
                      disabled={updating}
                    >
                      {updating ? "Updating..." : "Update"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal for Bids */}
      {showBidsModal && bidsTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className={`rounded-xl shadow-lg w-full max-w-md relative ${isDarkMode ? 'bg-slate-800 border border-slate-700 text-white' : 'bg-white'}`}>
            <div className="max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <button
                  className="absolute top-2 right-2 text-slate-400 hover:text-red-500 text-xl font-bold"
                  onClick={() => setShowBidsModal(false)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Bids for: {bidsTask.title}</h2>
                <div className={`text-lg mb-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Total Bids: <span className={`font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{bidsTask.bidCount ?? 0}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostedTask;
