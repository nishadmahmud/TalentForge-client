import React, { useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";

const Contact = () => {
  const { isDarkMode } = useDarkMode();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would normally send the form data to your backend or email service
  };

  return (
    <div
      className={`min-h-[80vh] flex flex-col items-center justify-center p-6 ${
        isDarkMode
          ? "bg-slate-900 text-white"
          : "bg-gradient-to-br from-slate-50 to-emerald-100 text-slate-900"
      }`}
    >
      <div className="max-w-2xl w-full rounded-2xl shadow-xl border p-8 mx-auto mt-10 mb-10"
        style={{background: isDarkMode ? undefined : 'white'}}>
        <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? "text-emerald-400" : "text-emerald-700"}`}>Contact Us</h1>
        <p className="mb-6 text-lg">Have a question, suggestion, or need support? Fill out the form below or reach us directly. We're here to help!</p>
        {submitted ? (
          <div className="text-emerald-600 text-lg font-semibold text-center py-8">Thank you for contacting us! We'll get back to you soon.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${isDarkMode ? "bg-slate-900 border-slate-700 text-white placeholder-slate-400" : "bg-white border-slate-200 text-slate-900"}`}
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${isDarkMode ? "bg-slate-900 border-slate-700 text-white placeholder-slate-400" : "bg-white border-slate-200 text-slate-900"}`}
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${isDarkMode ? "bg-slate-900 border-slate-700 text-white placeholder-slate-400" : "bg-white border-slate-200 text-slate-900"}`}
                placeholder="How can we help you?"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-lg font-semibold shadow-md transition-all duration-200 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Send Message
            </button>
          </form>
        )}
        <div className="mt-8 text-left">
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          <p>Email: <a href="mailto:mahmudnishad253@gmail.com" className="text-emerald-600 hover:underline">mahmudnishad253@gmail.com</a></p>
          <p>Phone: <a href="tel:+8801622064993" className="text-emerald-600 hover:underline">+8801622064993</a></p>
          <p>Address: Sylhet Sadar 3100, Sylhet, Bangladesh</p>
        </div>
      </div>
    </div>
  );
};

export default Contact; 