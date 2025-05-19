import React, { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { updateEmail } from "firebase/auth";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
    setError("");
    setSuccess("");
  };

  const handleCancel = () => {
    setEditMode(false);
    setDisplayName(user.displayName || "");
    setEmail(user.email || "");
    setPhotoURL(user.photoURL || "");
    setError("");
    setSuccess("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await updateUserProfile(displayName, photoURL);
      if (email !== user.email) {
        await updateEmail(user, email);
      }
      setSuccess("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center bg-gradient-to-br from-slate-50 to-emerald-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 max-w-md w-full flex flex-col items-center relative">
        {!editMode && (
          <button
            className="absolute top-4 right-4 text-slate-400 hover:text-emerald-600 transition-colors"
            onClick={handleEdit}
            aria-label="Edit profile"
          >
            <FaEdit size={20} />
          </button>
        )}
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-emerald-200 shadow mb-4">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || "User"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 text-4xl">
              ?
            </div>
          )}
        </div>
        {editMode ? (
          <form
            onSubmit={handleSave}
            className="w-full flex flex-col items-center gap-3"
          >
            <input
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Display Name"
              required
            />
            <input
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              required
            />
            <input
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Photo URL"
              type="url"
            />
            <div className="flex gap-2 mt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-60"
              >
                <FaCheck /> Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-slate-200 text-slate-700 font-semibold hover:bg-slate-300 transition-colors"
              >
                <FaTimes /> Cancel
              </button>
            </div>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            {success && (
              <div className="text-emerald-600 text-sm mt-2">{success}</div>
            )}
          </form>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">
              {user.displayName || "No Name"}
            </h2>
            <div className="text-slate-600 text-sm break-all text-center mb-1">
              <span className="font-semibold">Email:</span>
              <br />
              {user.email || "No email"}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
