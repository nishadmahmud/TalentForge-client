import React, { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { updateEmail } from "firebase/auth";
import { useDarkMode } from "../context/DarkModeContext";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { isDarkMode } = useDarkMode();

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
    <div
      className={`min-h-[80vh] flex justify-center items-center p-4 ${
        isDarkMode
          ? "bg-slate-900 text-white"
          : "bg-gradient-to-br from-slate-50 to-emerald-100 text-slate-900"
      }`}
    >
      <div
        className={`rounded-2xl shadow-xl border p-8 max-w-md w-full flex flex-col items-center relative ${
          isDarkMode
            ? "bg-slate-800 border-slate-700"
            : "bg-white border-slate-100"
        }`}
      >
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
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 ${
                isDarkMode
                  ? "bg-slate-900 border-slate-700 text-white placeholder-slate-400"
                  : "bg-white border-slate-200 text-slate-900"
              }`}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Display Name"
              required
            />
            <input
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 ${
                isDarkMode
                  ? "bg-slate-900 border-slate-700 text-white placeholder-slate-400"
                  : "bg-white border-slate-200 text-slate-900"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              required
            />
            <input
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 ${
                isDarkMode
                  ? "bg-slate-900 border-slate-700 text-white placeholder-slate-400"
                  : "bg-white border-slate-200 text-slate-900"
              }`}
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
                className={`flex items-center gap-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                  isDarkMode
                    ? "bg-slate-700 text-white hover:bg-slate-600"
                    : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                }`}
              >
                <FaTimes /> Cancel
              </button>
            </div>
            {error && (
              <div
                className={`text-red-500 text-sm mt-2 ${
                  isDarkMode ? "text-red-300" : ""
                }`}
              >
                {error}
              </div>
            )}
            {success && (
              <div
                className={`text-emerald-600 text-sm mt-2 ${
                  isDarkMode ? "text-emerald-400" : ""
                }`}
              >
                {success}
              </div>
            )}
          </form>
        ) : (
          <>
            <h2
              className={`text-2xl font-bold text-emerald-700 mb-2 ${
                isDarkMode ? "text-white" : ""
              }`}
            >
              {user.displayName || "No Name"}
            </h2>
            <div
              className={`text-slate-600 text-sm break-all text-center mb-1 ${
                isDarkMode ? "text-white" : ""
              }`}
            >
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
