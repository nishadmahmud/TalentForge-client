import React, { useEffect, useState } from "react";
import { Link } from "react-router";

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

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:3000/tasks");
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

  // Group tasks by category
  const tasksByCategory = tasks.reduce((acc, task) => {
    const cat = task.category || "other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(task);
    return acc;
  }, {});

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-slate-50 to-emerald-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-700 mb-8 text-center">Browse All Tasks</h1>
        {loading ? (
          <div className="text-center text-emerald-600 font-semibold">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 font-semibold">{error}</div>
        ) : (
          Object.keys(categoryLabels).map((cat) =>
            tasksByCategory[cat] && tasksByCategory[cat].length > 0 ? (
              <div key={cat} className="mb-10">
                <h2 className="text-2xl font-bold text-slate-800 mb-4 border-l-4 border-emerald-500 pl-3">
                  {categoryLabels[cat]}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tasksByCategory[cat].map((task) => (
                    <div
                      key={task._id}
                      className="bg-white rounded-xl shadow border border-slate-100 p-5 flex flex-col justify-between hover:shadow-lg transition-shadow"
                    >
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
              </div>
            ) : null
          )
        )}
      </div>
    </div>
  );
};

export default BrowseTask;
