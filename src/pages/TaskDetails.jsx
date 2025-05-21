import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

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
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:3000/tasks/${id}`);
        if (!res.ok) throw new Error("Task not found");
        const data = await res.json();
        setTask(data.task || data); // support both {task} and direct object
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTask();
  }, [id]);

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
              <button className="px-6 py-2 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors">
                Place a Bid
              </button>
              <button
                className="px-6 py-2 rounded-lg bg-slate-200 text-slate-700 font-semibold hover:bg-slate-300 transition-colors"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskDetails; 