import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import toast from 'react-hot-toast';

const PostedTask = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`http://localhost:3000/my-tasks?email=${encodeURIComponent(user?.email)}`);
                const data = await res.json();
                if (data.success) {
                    setTasks(data.tasks);
                } else {
                    throw new Error(data.message || 'Failed to fetch tasks');
                }
            } catch (err) {
                setError(err.message);
                toast.error(err.message || 'Failed to fetch tasks');
            } finally {
                setLoading(false);
            }
        };
        if (user?.email) fetchTasks();
    }, [user?.email]);

    // Placeholder handlers
    const handleUpdate = (task) => {
        toast('Update feature coming soon!');
    };
    const handleDelete = (taskId) => {
        toast('Delete feature coming soon!');
    };
    const handleBids = (taskId) => {
        toast('Bids feature coming soon!');
    };

    return (
        <div className="min-h-[80vh] flex justify-center items-center bg-gradient-to-br from-slate-50 to-emerald-100 p-4">
            <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-6">My Posted Tasks</h1>
                {loading ? (
                    <div className="text-center text-emerald-600 font-semibold">Loading...</div>
                ) : error ? (
                    <div className="text-center text-red-500 font-semibold">{error}</div>
                ) : tasks.length === 0 ? (
                    <div className="text-center text-slate-500">You have not posted any tasks yet.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Title</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Budget</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Deadline</th>
                                    <th className="px-4 py-2 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-100">
                                {tasks.map(task => (
                                    <tr key={task._id}>
                                        <td className="px-4 py-3 font-semibold text-slate-800">{task.title}</td>
                                        <td className="px-4 py-3 text-slate-700">{task.category}</td>
                                        <td className="px-4 py-3 text-emerald-700 font-bold">${task.budget}</td>
                                        <td className="px-4 py-3 text-slate-600">{task.deadline}</td>
                                        <td className="px-4 py-3 flex flex-col sm:flex-row gap-2 justify-center items-center">
                                            <button onClick={() => handleUpdate(task)} className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs font-semibold">Update</button>
                                            <button onClick={() => handleDelete(task._id)} className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-semibold">Delete</button>
                                            <button onClick={() => handleBids(task._id)} className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded text-xs font-semibold">Bids</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostedTask;